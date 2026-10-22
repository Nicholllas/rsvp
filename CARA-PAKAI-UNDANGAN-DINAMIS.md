# 📖 Cara Menggunakan Undangan Dinamis

Project ini sudah dilengkapi dengan fitur **undangan personal** yang memungkinkan setiap tamu mendapatkan link undangan unik dengan nama mereka sendiri dan jumlah teman/keluarga yang boleh dibawa.

## 🎯 Konsep Dasar

Setiap tamu akan mendapat link seperti:
```
https://undangan-anda.vercel.app/bapak-budi-santoso-a3f7c2e1
```

Ketika tamu membuka link tersebut:
- Nama tamu otomatis muncul di undangan
- Jumlah tamu pendamping (max companions) disesuaikan
- Setiap link adalah unik dan tidak bisa ditebak

## 📋 Struktur Database

Tabel `guests` di Supabase memiliki kolom:
- `id` - UUID unik
- `slug` - URL unik untuk tamu (contoh: `bapak-budi-santoso-a3f7c2e1`)
- `name` - Nama lengkap tamu
- `phone` - Nomor telepon (opsional)
- `guest_type` - Kategori: `family`, `friends`, `colleagues`, `vip`, atau `guest`
- `max_companions` - Jumlah tamu pendamping (0-10)
- `invited_at` - Waktu data dibuat
- `opened_at` - Waktu pertama kali link dibuka (opsional, belum aktif)

**📌 Catatan penting:** 
Link lengkap **TIDAK disimpan di database**. Yang disimpan hanya `slug`. Link lengkap di-generate dari formula:
```
{NEXT_PUBLIC_SITE_URL}/{slug}
```
Contoh: `https://rsvp-alin-richard.vercel.app/bapak-budi-santoso-a3f7c2e1`

---

## 🚀 Langkah-Langkah Setup

### 1️⃣ Setup Schema Database

Jalankan schema untuk tabel guests di Supabase:

1. Buka **Supabase Dashboard** → project Anda
2. Klik **SQL Editor** di menu kiri
3. Klik **New Query**
4. Copy-paste isi file `supabase/schema-guests.sql`
5. Klik **Run**

✅ Tabel `guests` sekarang sudah siap!

---

### 2️⃣ Tambahkan Service Role Key

Untuk menambahkan data tamu, Anda perlu **Service Role Key** (berbeda dengan Anon Key):

1. Buka **Supabase Dashboard** → **Settings** → **API**
2. Di bagian **Project API keys**, cari **service_role** (secret)
3. Copy key tersebut
4. Tambahkan ke file `.env.local`:

```env
SUPABASE_URL=https://xoymyhgckncbmjigifjr.supabase.co
SUPABASE_ANON_KEY=sb_publishable_XLKXwDYrwVt631GNotpFpA_tDQW45sh
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc....(key panjang dari Supabase)
NEXT_PUBLIC_SITE_URL=https://rsvp-alin-richard.vercel.app
```

**Catatan penting untuk NEXT_PUBLIC_SITE_URL:**
- Untuk testing lokal: `http://localhost:3000`
- Untuk production: `https://rsvp-alin-richard.vercel.app` (atau domain Vercel Anda)
- URL ini digunakan untuk generate link undangan yang akan ditampilkan setelah seed

⚠️ **PENTING**: `SUPABASE_SERVICE_ROLE_KEY` hanya untuk script lokal, **JANGAN** push ke Git atau deploy ke Vercel!

---

### 3️⃣ Edit Daftar Tamu

Buka file `scripts/seed-guests.mjs` dan edit array `guestList`:

```javascript
const guestList = [
  { name: 'Bapak Budi Santoso', phone: '081234567890', type: 'family', max: 4 },
  { name: 'Ibu Siti Nurhaliza', phone: '081298765432', type: 'friends', max: 2 },
  { name: 'Dr. Ahmad Rahman', phone: '081345678901', type: 'colleagues', max: 3 },
];
```

**Penjelasan field:**
- `name` - Nama tamu (akan muncul di undangan)
- `phone` - Nomor WA untuk mengirim link (opsional)
- `type` - Kategori: `family` / `friends` / `colleagues` / `vip` / `guest`
- `max` - Jumlah tamu pendamping yang boleh dibawa (0-10)

**Contoh:**
```javascript
{ name: 'Pak Joko & Keluarga', phone: '08123456789', type: 'family', max: 5 },
{ name: 'Ibu Maria', phone: '08198765432', type: 'friends', max: 1 },
```

---

### 4️⃣ Jalankan Script Seed

Setelah daftar tamu siap, jalankan script untuk generate slug dan insert ke database:

```bash
node scripts/seed-guests.mjs
```

**Output yang Anda lihat:**

```
🌱 Starting guest seed...

✅ Bapak Budi Santoso
   Slug: bapak-budi-santoso-a3f7c2e1
   Link: https://xoymyhgckncbmjigifjr.vercel.app/bapak-budi-santoso-a3f7c2e1

✅ Ibu Siti Nurhaliza
   Slug: ibu-siti-nurhaliza-b8e4d9f2
   Link: https://xoymyhgckncbmjigifjr.vercel.app/ibu-siti-nurhaliza-b8e4d9f2

📊 Summary:
   ✅ Success: 5
   ❌ Failed: 0
   📋 Total: 5
```

✅ **Data tamu sudah masuk ke database!**

---

### 5️⃣ Test di Local

Coba buka link yang dihasilkan (ganti domain dengan `localhost:3000`):

```
http://localhost:3000/bapak-budi-santoso-a3f7c2e1
```

Harusnya Anda melihat:
- Nama "Bapak Budi Santoso" muncul di bagian atas undangan
- Form RSVP dengan opsi jumlah tamu sesuai `max_companions`

---

### 6️⃣ Kirim Link ke Tamu

**A. Manual via WhatsApp:**
```
Yth. Bapak Budi Santoso,

Kami mengundang Bapak serta keluarga di acara pernikahan kami:

https://undangan-kami.vercel.app/bapak-budi-santoso-a3f7c2e1

Terima kasih 🙏
Alin & Richard
```

**B. Export dari Supabase:**

Jalankan query di **SQL Editor**:

```sql
SELECT 
  name,
  phone,
  'https://undangan-kami.vercel.app/' || slug as link
FROM guests 
ORDER BY invited_at DESC;
```

Export ke CSV dan gunakan tool bulk WhatsApp sender.

---

## 🔒 Keamanan

### ✅ Yang AMAN:
- `SUPABASE_URL` - boleh public
- `SUPABASE_ANON_KEY` - boleh di Vercel
- Slug unik dengan 8 karakter random (4 miliar kombinasi)
- Row Level Security aktif

### ⛔ JANGAN:
- Commit `SUPABASE_SERVICE_ROLE_KEY` ke Git
- Deploy `SUPABASE_SERVICE_ROLE_KEY` ke Vercel
- Service role key hanya untuk script lokal

---

## 📊 Mengelola Data Tamu

### Lihat semua tamu:
```sql
SELECT name, slug, max_companions, guest_type 
FROM guests 
ORDER BY name;
```

### Tambah tamu manual:
```sql
INSERT INTO guests (slug, name, phone, guest_type, max_companions)
VALUES (
  'pak-agus-wijaya-c7d9e2f1',
  'Pak Agus Wijaya',
  '08123456789',
  'friends',
  2
);
```

### Update max companions:
```sql
UPDATE guests 
SET max_companions = 5 
WHERE slug = 'bapak-budi-santoso-a3f7c2e1';
```

### Hapus tamu:
```sql
DELETE FROM guests 
WHERE slug = 'nama-tamu-slug';
```

---

## ❓ Troubleshooting

### Error: "Missing SUPABASE_SERVICE_ROLE_KEY"
→ Pastikan sudah tambahkan key di `.env.local`

### Error: "Guest not found"
→ Cek apakah slug benar dan data ada di tabel `guests`

### Nama tidak muncul di undangan
→ Cek API response di DevTools Network tab

### Link tidak berfungsi di production
→ Pastikan `NEXT_PUBLIC_SITE_URL` di Vercel sesuai domain production

---

## 📝 Checklist Sebelum Launch

- [ ] Schema `schema-guests.sql` sudah dijalankan di Supabase
- [ ] Daftar tamu sudah diedit di `seed-guests.mjs`
- [ ] Script seed berhasil dijalankan tanpa error
- [ ] Test minimal 3 link di local (beda max_companions)
- [ ] Vercel environment variables sudah diset (tanpa SERVICE_ROLE_KEY)
- [ ] Test link production setelah deploy
- [ ] Siapkan template pesan WhatsApp

---

## 🎉 Selamat!

Undangan personal Anda sudah siap! Setiap tamu akan merasa spesial dengan undangan yang disesuaikan untuk mereka.

Jika ada pertanyaan, cek file ini lagi atau lihat kode di:
- `app/[slug]/page.tsx` - halaman undangan personal
- `app/api/guest/[slug]/route.ts` - API untuk ambil data tamu
- `lib/supabase-server.ts` - Supabase client config

