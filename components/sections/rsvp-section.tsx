"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, MessageCircleHeart, Send, Users } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { type GuestMessage, type RsvpInput, rsvpSchema } from "@/lib/rsvp-schema";
import { cn } from "@/lib/utils";

export function RsvpSection({ initialName }: { initialName: string }) {
  const [messages, setMessages] = useState<GuestMessage[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const [notice, setNotice] = useState<{ type: "success" | "error" | "setup"; text: string } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RsvpInput>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: { name: initialName, attendance: "attending", guestCount: 1, message: "", website: "" },
  });
  const attendance = watch("attendance");

  const loadMessages = useCallback(async (silent = false) => {
    if (!silent) setIsLoadingMessages(true);
    try {
      const response = await fetch("/api/rsvp", { cache: "no-store" });
      const body = await response.json();
      if (response.ok) {
        setMessages(body.messages ?? []);
        if (!body.configured) setNotice({ type: "setup", text: "Mode demo: hubungkan Supabase untuk mengaktifkan RSVP." });
      }
    } catch {
      if (!silent) setNotice({ type: "error", text: "Daftar ucapan belum dapat dimuat." });
    } finally {
      if (!silent) setIsLoadingMessages(false);
    }
  }, []);

  useEffect(() => {
    void loadMessages();
    const interval = window.setInterval(() => void loadMessages(true), 10_000);
    return () => window.clearInterval(interval);
  }, [loadMessages]);

  async function onSubmit(values: RsvpInput) {
    setNotice(null);
    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error ?? "Gagal mengirim RSVP.");

      setMessages((current) => [body.message, ...current]);
      setNotice({ type: "success", text: "Terima kasih, konfirmasi dan ucapan Anda sudah tersimpan." });
      reset({ name: initialName, attendance: "attending", guestCount: 1, message: "", website: "" });
    } catch (error) {
      setNotice({ type: "error", text: error instanceof Error ? error.message : "Terjadi kesalahan." });
    }
  }

  return (
    <section id="rsvp" className="batak-pattern-light relative overflow-hidden">
      <div className="section-shell">
        <SectionHeading eyebrow="Will you join us?" title="RSVP & Ucapan" />
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="glass-card rounded-3xl p-6 sm:p-8">
            <h3 className="font-serif text-3xl font-semibold text-sage-900">Konfirmasi Kehadiran</h3>
            <p className="mt-2 text-sm text-sage-700/70">Mohon isi sebelum 12 Juni 2027.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-5" noValidate>
              <div>
                <label htmlFor="name" className="mb-2 block text-xs font-medium text-sage-800">Nama lengkap</label>
                <Input id="name" placeholder="Nama Anda" autoComplete="name" {...register("name")} />
                {errors.name && <p className="mt-1.5 text-xs text-rose">{errors.name.message}</p>}
              </div>

              <fieldset>
                <legend className="mb-2 text-xs font-medium text-sage-800">Konfirmasi kehadiran</legend>
                <div className="grid grid-cols-2 gap-2">
                  <label className={cn("cursor-pointer rounded-xl border px-3 py-3 text-center text-xs transition", attendance === "attending" ? "border-sage-500 bg-sage-100 text-sage-900" : "bg-white/60 text-sage-700")}>
                    <input type="radio" value="attending" className="sr-only" {...register("attendance")} />
                    Ya, saya hadir
                  </label>
                  <label className={cn("cursor-pointer rounded-xl border px-3 py-3 text-center text-xs transition", attendance === "not_attending" ? "border-sage-500 bg-sage-100 text-sage-900" : "bg-white/60 text-sage-700")}>
                    <input type="radio" value="not_attending" className="sr-only" {...register("attendance")} />
                    Maaf, tidak hadir
                  </label>
                </div>
              </fieldset>

              {attendance === "attending" && (
                <div>
                  <label htmlFor="guestCount" className="mb-2 block text-xs font-medium text-sage-800">Jumlah tamu</label>
                  <select id="guestCount" className="h-11 w-full rounded-xl border border-sage-700/15 bg-white/70 px-4 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/15" {...register("guestCount")}>
                    {[1, 2, 3, 4, 5].map((count) => <option key={count} value={count}>{count} orang</option>)}
                  </select>
                  {errors.guestCount && <p className="mt-1.5 text-xs text-rose">{errors.guestCount.message}</p>}
                </div>
              )}

              <div>
                <label htmlFor="message" className="mb-2 block text-xs font-medium text-sage-800">Ucapan & doa</label>
                <Textarea id="message" placeholder="Tulis doa terbaik Anda..." {...register("message")} />
                {errors.message && <p className="mt-1.5 text-xs text-rose">{errors.message.message}</p>}
              </div>

              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
              </div>

              {notice && (
                <div className={cn("rounded-xl px-4 py-3 text-xs leading-relaxed", notice.type === "success" && "bg-sage-100 text-sage-900", notice.type === "error" && "bg-red-50 text-red-700", notice.type === "setup" && "bg-amber-50 text-amber-800")}>
                  {notice.text}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                {isSubmitting ? "Mengirim..." : "Kirim Konfirmasi"}
              </Button>
            </form>
          </Reveal>

          <Reveal className="rounded-3xl bg-sage-900 p-6 text-ivory shadow-soft sm:p-8" delay={0.08}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-gold">Buku Tamu</p>
                <h3 className="mt-2 font-serif text-3xl font-semibold">Doa untuk Kami</h3>
              </div>
              <MessageCircleHeart className="h-7 w-7 text-gold" strokeWidth={1.5} />
            </div>

            <div className="mt-7 max-h-[550px] space-y-3 overflow-y-auto pr-1">
              {isLoadingMessages && (
                <div className="grid place-items-center py-16"><Loader2 className="h-5 w-5 animate-spin text-gold" /><span className="mt-3 text-xs text-ivory/50">Memuat ucapan...</span></div>
              )}
              {!isLoadingMessages && messages.length === 0 && (
                <div className="rounded-2xl border border-white/10 px-5 py-12 text-center text-sm text-ivory/55">Jadilah yang pertama mengirimkan doa hangat.</div>
              )}
              {messages.map((item) => (
                <article key={item.id} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-medium text-white">{item.name}</h4>
                      <p className="mt-1 flex items-center gap-1.5 text-[10px] text-gold">
                        {item.attendance === "attending" ? <><CheckCircle2 className="h-3 w-3" /> Akan hadir</> : <>Berhalangan hadir</>}
                        {item.attendance === "attending" && <><span>·</span><Users className="h-3 w-3" /> {item.guest_count}</>}
                      </p>
                    </div>
                    <time className="text-[9px] text-ivory/35" dateTime={item.created_at}>
                      {new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short" }).format(new Date(item.created_at))}
                    </time>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ivory/70">{item.message}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
