import { getSupabaseServerClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

export const runtime = "edge";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(request: Request, context: RouteContext) {
  const { slug } = await context.params;

  // Basic validation
  if (!slug || slug.length < 8 || slug.length > 80) {
    return NextResponse.json({ error: "Invalid slug format" }, { status: 400 });
  }

  const supabase = getSupabaseServerClient();

  if (!supabase) {
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }

  const { data, error } = await supabase.from("guests").select("name, max_companions").eq("slug", slug).maybeSingle();

  if (error) {
    console.error("[guest-lookup] Supabase error:", error.message);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: "Guest not found" }, { status: 404 });
  }

  // Optional: track when invitation was opened (uncomment if needed)
  // await supabase.from('guests').update({ opened_at: new Date().toISOString() }).eq('slug', slug).is('opened_at', null);

  return NextResponse.json({
    name: data.name,
    maxCompanions: data.max_companions ?? 0,
  });
}
