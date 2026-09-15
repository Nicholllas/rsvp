import { NextResponse } from "next/server";

import { weddingConfig } from "@/config/wedding";

export const runtime = "edge";

function toIcsDate(date: string) {
  return new Date(date).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function escapeIcs(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\\;").replace(/\n/g, "\\n");
}

export async function GET(request: Request) {
  const eventId = new URL(request.url).searchParams.get("event") ?? "reception";
  const event = weddingConfig.events.find((item) => item.id === eventId);

  if (!event) {
    return NextResponse.json({ error: "Acara tidak ditemukan." }, { status: 404 });
  }

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Alin dan Richard//Wedding Invitation//ID",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${event.id}-alin-richard@wedding.local`,
    `DTSTAMP:${toIcsDate(new Date().toISOString())}`,
    `DTSTART:${toIcsDate(event.date)}`,
    `DTEND:${toIcsDate(event.endDate)}`,
    `SUMMARY:${escapeIcs(`${event.title} — ${weddingConfig.couple.shortNames}`)}`,
    `DESCRIPTION:${escapeIcs(`Undangan pernikahan ${weddingConfig.couple.shortNames}`)}`,
    `LOCATION:${escapeIcs(`${event.venue}, ${event.address}`)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return new NextResponse(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${event.id}-alin-richard.ics"`,
    },
  });
}
