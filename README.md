# Undangan Pernikahan Digital - Alin & Richard

Undangan satu halaman yang mobile-first, dibangun dengan Next.js App Router, TypeScript,
Tailwind CSS, Framer Motion, komponen bergaya shadcn/ui, React Hook Form, Zod, dan Supabase.
Seluruh operasi database berjalan melalui API Route agar kredensial database tidak dipakai
langsung oleh komponen client.

## Menjalankan secara lokal

Pastikan Node.js 20+ dan pnpm tersedia.

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Buka `http://localhost:3000?to=Nama%20Tamu`. Tanpa environment variable Supabase, website
tetap dapat dilihat dalam mode demo; pengiriman RSVP dinonaktifkan.

## Menyiapkan Supabase

1. Buat project baru di [Supabase](https://supabase.com/).
2. Buka **SQL Editor**, lalu jalankan isi `supabase/schema.sql`.
3. Di **Project Settings → API**, salin Project URL dan anon/public key.
4. Isi `.env.local`:

```env
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_ANON_KEY=ey...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Row Level Security sudah diaktifkan oleh schema. Pengunjung hanya dapat membaca ucapan
yang disetujui dan menambah RSVP; mereka tidak dapat mengubah atau menghapus data.

## Mengubah konten

Semua data utama berada di `config/wedding.ts`: nama pasangan, tanggal, profil, timeline,
lokasi, URL Google Maps, galeri, rekening, penutup, dan musik. Ganti SVG di `public/images`
dengan foto sendiri (nama file boleh tetap sama), lalu letakkan musik berlisensi di
`public/audio/background-music.mp3`.

Tanggal menggunakan string ISO dengan offset zona waktu, misalnya
`2027-06-26T08:00:00+07:00`. Link kalender `.ics` dibuat otomatis oleh `/api/calendar`.

## Deploy ke Vercel Hobby

1. Push folder ini ke repository GitHub.
2. Di [Vercel](https://vercel.com/new), pilih **Add New Project** lalu import repository.
3. Framework akan terdeteksi sebagai Next.js. Tambahkan environment variables
   `SUPABASE_URL`, `SUPABASE_ANON_KEY`, dan `NEXT_PUBLIC_SITE_URL` (isi dengan domain
   production, misalnya `https://undangan-kami.vercel.app`).
4. Klik **Deploy**.

API RSVP memakai Edge Route dan daftar ucapan di-refresh berkala dari browser, sehingga
tidak membutuhkan server long-running dan sesuai untuk Vercel Hobby.

## Pemeriksaan sebelum deploy

```bash
pnpm typecheck
pnpm lint
pnpm build
```

## Struktur penting

```text
app/                  halaman, metadata OG, dan API routes
components/sections/  komponen tiap bagian undangan
components/ui/        komponen dasar bergaya shadcn/ui
config/wedding.ts     seluruh konten yang mudah diedit
lib/                  validasi, utilitas, dan Supabase server client
public/                gambar dan audio lokal
supabase/schema.sql   tabel, index, dan RLS policy
```
