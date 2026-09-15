import { NextResponse } from "next/server";

import { rsvpSchema } from "@/lib/rsvp-schema";
import { getSupabaseServerClient } from "@/lib/supabase-server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const MAX_REQUEST_BYTES = 8_192;
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1_000;
const noStoreHeaders = { "Cache-Control": "no-store" };
const rateLimits = new Map<string, { count: number; resetAt: number }>();

function errorResponse(message: string, status: number) {
  return NextResponse.json(
    { error: message },
    { status, headers: noStoreHeaders },
  );
}

function isCrossSiteRequest(request: Request) {
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite === "cross-site") return true;

  const origin = request.headers.get("origin");
  return origin !== null && origin !== new URL(request.url).origin;
}

function getRateLimit(request: Request) {
  const now = Date.now();
  const clientId =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimits.size > 1_000) {
    for (const [key, value] of rateLimits) {
      if (value.resetAt <= now) rateLimits.delete(key);
    }
  }

  const current = rateLimits.get(clientId);
  if (!current || current.resetAt <= now) {
    const resetAt = now + RATE_LIMIT_WINDOW_MS;
    rateLimits.set(clientId, { count: 1, resetAt });
    return { allowed: true, retryAfter: 0 };
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1_000)),
    };
  }

  current.count += 1;
  return { allowed: true, retryAfter: 0 };
}

async function readLimitedBody(request: Request) {
  if (!request.body) return "";

  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let body = "";
  let bytesRead = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    bytesRead += value.byteLength;
    if (bytesRead > MAX_REQUEST_BYTES) {
      await reader.cancel();
      return null;
    }

    body += decoder.decode(value, { stream: true });
  }

  return body + decoder.decode();
}

export async function GET() {
  const supabase = getSupabaseServerClient();

  if (!supabase) {
    return NextResponse.json({ messages: [], configured: false });
  }

  const { data, error } = await supabase
    .from("guest_messages")
    .select("id,name,attendance,guest_count,message,created_at")
    .eq("approved", true)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    console.error("Supabase RSVP read failed", {
      code: error.code,
      message: error.message,
    });
    return errorResponse("Gagal memuat ucapan.", 500);
  }

  return NextResponse.json(
    { messages: data, configured: true },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(request: Request) {
  if (isCrossSiteRequest(request)) {
    return errorResponse("Permintaan tidak diizinkan.", 403);
  }

  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return errorResponse("Content-Type harus application/json.", 415);
  }

  const rateLimit = getRateLimit(request);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Terlalu banyak percobaan. Silakan coba lagi beberapa menit." },
      {
        status: 429,
        headers: {
          ...noStoreHeaders,
          "Retry-After": String(rateLimit.retryAfter),
        },
      },
    );
  }

  const declaredLength = Number(request.headers.get("content-length") ?? "0");
  if (!Number.isFinite(declaredLength) || declaredLength > MAX_REQUEST_BYTES) {
    return errorResponse("Payload terlalu besar.", 413);
  }

  const supabase = getSupabaseServerClient();

  if (!supabase) {
    return errorResponse("Supabase belum dikonfigurasi. Lihat .env.example.", 503);
  }

  const rawBody = await readLimitedBody(request);
  if (rawBody === null) {
    return errorResponse("Payload terlalu besar.", 413);
  }

  const payload = (() => {
    try {
      return JSON.parse(rawBody) as unknown;
    } catch {
      return null;
    }
  })();
  const parsed = rsvpSchema.safeParse(payload);

  if (!parsed.success) {
    return errorResponse(
      parsed.error.issues[0]?.message ?? "Data tidak valid.",
      400,
    );
  }

  const { name, attendance, guestCount, message } = parsed.data;
  const { data, error } = await supabase
    .from("guest_messages")
    .insert({
      name,
      attendance,
      guest_count: attendance === "attending" ? guestCount : 0,
      message,
    })
    .select("id,name,attendance,guest_count,message,created_at")
    .single();

  if (error) {
    console.error("Supabase RSVP insert failed", {
      code: error.code,
      message: error.message,
    });
    return errorResponse("Ucapan belum berhasil disimpan.", 500);
  }

  return NextResponse.json(
    { message: data },
    { status: 201, headers: noStoreHeaders },
  );
}
