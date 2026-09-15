import { NextResponse } from "next/server";

import { rsvpSchema } from "@/lib/rsvp-schema";
import { getSupabaseServerClient } from "@/lib/supabase-server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

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
    return NextResponse.json({ error: "Gagal memuat ucapan." }, { status: 500 });
  }

  return NextResponse.json(
    { messages: data, configured: true },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(request: Request) {
  const supabase = getSupabaseServerClient();

  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase belum dikonfigurasi. Lihat .env.example." },
      { status: 503 },
    );
  }

  const payload = await request.json().catch(() => null);
  const parsed = rsvpSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Data tidak valid." },
      { status: 400 },
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
    return NextResponse.json({ error: "Ucapan belum berhasil disimpan." }, { status: 500 });
  }

  return NextResponse.json({ message: data }, { status: 201 });
}
