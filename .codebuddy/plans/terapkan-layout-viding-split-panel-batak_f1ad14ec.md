---
name: terapkan-layout-viding-split-panel-batak
overview: |-
  Mengadopsi layout split-screen khas viding.co — background foto full-screen di sisi kiri/kiri full dan panel konten semi-transparan yang persist di sisi kanan — ke dalam project RSVP Batak, sambil mempertahankan dan justru°.
  mempercantik identitas visual Batak (gorga, ulos, merah-emas, serif Cormorant).
design:
  architecture:
    framework: react
    component: shadcn
  styleKeywords:
    - Batak Toba heritage
    - Split-screen persistent panel
    - Gorga ornament enriched
    - Ulos textile texture
    - Glassmorphism dark overlay
    - Serif elegance Cormorant
    - Ember particle motion
    - Chat bubble wishes
  fontSystem:
    fontFamily: Cormorant_Garamond + Jost
    heading:
      size: clamp(2.5rem,6vw,5rem)
      weight: 600
    subheading:
      size: clamp(1.25rem,2.5vw,2rem)
      weight: 500
    body:
      size: 15px
      weight: 400
  colorSystem:
    primary:
      - "#8d2f2b"
      - "#b4975a"
      - "#181312"
    background:
      - "#181312"
      - "#4f1f1e"
      - "#f8f4eb"
    text:
      - "#fffdf7"
      - "#d8bd8a"
      - "#281a18"
    functional:
      - "#8d2f2b"
      - "#a63a32"
      - "#b4975a"
todos:
  - id: create-split-layout
    content: Buat komponen SplitLayout, StickyPhotoPanel (foto swap IntersectionObserver + AnimatePresence + overlay Batak + ember + UlosBand), dan ContentPanel (bg semi-transparan + border gorga) di components/layout/
    status: completed
  - id: enhance-batak-ornament
    content: "Perkaya batak-ornament.tsx: BatakDivider dengan GorgaMark di tengah, tambah variant panel context di section-heading.tsx, dan utility .chat-bubble + .panel-gorga-border + formatRelativeTime di globals.css/lib/utils"
    status: completed
  - id: integrate-split-layout
    content: "Modifikasi invitation-page.tsx: wrap main dalam SplitLayout, wire foto swap context, pertahankan OpeningCover + MusicControl di luar"
    status: completed
    dependencies:
      - create-split-layout
      - enhance-batak-ornament
  - id: adjust-sections-panel
    content: Sesuaikan hero/quote/couple/story/closing sections untuk konteks panel semi-transparan (bg transparan, border gorga, heading overlay variant)
    status: completed
    dependencies:
      - integrate-split-layout
  - id: redesign-event-date
    content: Redesign event-section.tsx dengan layout angka serif besar di kiri + detail di kanan di atas foto venue, pertahankan maps iframe
    status: completed
    dependencies:
      - adjust-sections-panel
  - id: chat-bubble-wishes
    content: "Modifikasi rsvp-section.tsx: wishlist jadi chat-bubble (avatar lingkaran batak-red + inisial + bubble rounded + timestamp relatif + \"Muat lebih banyak\"), form tetap rhf+zod"
    status: completed
    dependencies:
      - enhance-batak-ornament
  - id: verify-responsive
    content: Verifikasi layout split-screen desktop (≥1024px) vs mobile stacked, pastikan reduced-motion + tidak ada regressi pada gallery/gift sections, gunakan [skill:agent-browser] untuk screenshot perbandingan
    status: completed
    dependencies:
      - chat-bubble-wishes
      - redesign-event-date
---

## Product Overview

Website undangan pernikahan digital bertema Batak (gorga, ulos, merah-emas) yang mengadopsi pola layout split-screen persisten dari referensi viding.co — foto sticky full-screen di kiri dan panel konten semi-transparan yang persist di kanan pada desktop, serta stacked full-width pada mobile — tanpa mengubah identitas visual Batak yang sudah ada, justru memperkaya ornamen dan motion-nya.

## Core Features

- Layout **split-screen persisten** pada desktop: kolom kiri foto full-height sticky, kolom kanan panel konten semi-transparan (bg foto + overlay gelap Batak) yang menampung semua section
- **Mobile**: semua section menjadi card full-width stacked vertikal, heading serif uppercase dengan tracking lebar, foto dengan overlay subtle
- **Chat-bubble ucapan** dengan avatar inisial lingkaran, nama, pesan, timestamp relatif ("3 hari lalu"), tombol "Muat lebih banyak"
- **Section tanggal/acara** dengan angka serif besar di kiri, detail di kanan, di atas foto background venue
- **Hero countdown** dipertahankan dengan style angka serif besar + label sans kecil
- Peningkatan ornamen Batak: ornamen gorga lebih kaya di border panel, tekstur ulos yang lebih halus, ember particle motion yang lebih hidup

## Tech Stack

- **Framework**: Next.js 15.5.24 (App Router) + React 18.3.1 + TypeScript (sudah ada)
- **Styling**: TailwindCSS 3.4.13 + tailwindcss-animate (sudah ada)
- **Animation**: framer-motion ^11.11.1 (sudah ada)
- **Icons**: lucide-react (sudah ada)
- **Forms**: react-hook-form + zod + @hookform/resolvers (sudah ada)
- **Backend**: @supabase/supabase-js (sudah ada)
- **Fonts**: Cormorant_Garamond (serif) + Jost (sans) via next/font (sudah ada)
- Tidak menambah dependency baru; semua perubahan menggunakan stack yang sudah ada

## Implementation Approach

### Strategi Inti: Split-Screen Persisten dengan CSS Grid + Sticky

Layout referensi viding.co menggunakan **dua kolom pada desktop**: kiri adalah foto sticky `position: sticky; top: 0; height: 100vh` dan kanan adalah panel konten yang scroll normal. Pada mobile, layout collapse menjadi single-column stacked. Pendekatan ini dipilih karena:

1. **CSS-native sticky** — tidak butuh JS scroll listener, performa optimal, tidak menyebabkan layout shift
2. **Progressive enhancement** — Tailwind `lg:grid-cols-[...]` + `lg:sticky` memberikan split-screen hanya di desktop, mobile otomatis stack
3. **Compatible dengan framer-motion** — section `whileInView` tetap bekerja karena panel kanan scroll normal
4. **Tema Batak preserved** — overlay gelap menggunakan `bg-batak-ink/` palette, border gorga, bukan putih-hitam viding

### Peningkatan Tema Batak ("improve")

1. **Panel border gorga**: panel kanan dapat border-top `bg-gorga` repeat + border `border-gold/25` untuk frame ornamen Batak yang lebih kaya
2. **Background foto swap**: foto sticky kiri dapat berganti per-section (couple→event→gallery) menggunakan `IntersectionObserver` + framer-motion crossfade, memperkaya dinamika visual
3. **Ulos rail di divider**: `BatakDivider` ditambah ornamen gorga mark di tengah (bukan hanya diamond)
4. **Ember particle enhanced**: tambahkan partikel emas yang melayang di panel sticky (sudah ada `ember-float` keyframe, tinggal tambah elemen)
5. **Chat bubble Batak style**: bubble ucapan menggunakan `bg-batak-red/15` + border `border-gold/20` + avatar lingkaran `bg-batak-red` dengan inisial, bukan pink muda

### Performance & Reliability

- Sticky foto menggunakan `next/image` dengan `fill` + `priority` hanya untuk foto pertama, sisanya `loading="lazy"`
- IntersectionObserver untuk foto swap adalah O(1) per section, tidak ada layout thrashing
- Chat bubble "Load more" menggunakan pagination client-side (slice array), tidak fetch ulang
- `useReducedMotion` tetap dihormati di semua animasi baru
- Tidak ada N+1: data ucapan sudah di-fetch sekali + interval 10s polling (existing pattern)

### Backward Compatibility

- `invitation-page.tsx` struktur komposisi tetap, hanya di-wrap dalam layout split-screen baru
- `config/wedding.ts` tidak diubah (data-driven)
- API routes tidak disentuh
- Semua section components tetap berfungsi, hanya adjust className untuk konteks panel
- `OpeningCover` dan `MusicControl` tetap di luar main (fixed/overlay)

## Architecture Design

### Sistem Layout Baru

```
InvitationPage
├── OpeningCover (fixed z-[100], tidak berubah)
├── SplitLayout (NEW — wrapper grid)
│   ├── StickyPhotoPanel (NEW — kolom kiri, lg:sticky, foto swap per-section)
│   └── ContentPanel (NEW — kolom kanan, panel semi-transparan Batak)
│       ├── HeroSection (adjust: bukan full-100svh lagi, jadi panel hero)
│       ├── QuoteSection (adjust: bg panel, bukan full-width sage-900)
│       ├── BatakDivider (enhanced)
│       ├── CoupleSection (adjust: 2 card dalam panel)
│       ├── StorySection (adjust: timeline dalam panel)
│       ├── BatakDivider
│       ├── EventSection (adjust: section tanggal serif besar + detail)
│       ├── GallerySection (adjust: grid dalam panel)
│       ├── BatakDivider
│       ├── RsvpSection (adjust: form + chat-bubble wishes)
│       ├── GiftSection (adjust: cards dalam panel)
│       └── ClosingSection (adjust: footer dalam panel)
├── MusicControl (fixed, tidak berubah)
```

### Data Flow

```
User scroll → ContentPanel scroll normal → IntersectionObserver trigger foto swap di StickyPhotoPanel → framer-motion crossfade foto + whileInView reveal konten section
```

### Komponen Baru

1. **`SplitLayout`** — wrapper `lg:grid lg:grid-cols-[1fr_1fr]` (atau `lg:grid-cols-[3fr_2fr]`), mobile `grid-cols-1`
2. **`StickyPhotoPanel`** — `lg:sticky lg:top-0 lg:h-screen`, berisi `<Image fill>` dengan framer-motion AnimatePresence untuk crossfade, overlay `bg-gradient-to-b from-batak-ink/60 to-batak-ink/85`, `UlosBand` top/bottom, ember particles
3. **`ContentPanel`** — `lg:relative`, bg `bg-batak-ink/95 backdrop-blur-sm` dengan border gorga, `overflow-hidden`

## Directory Structure Summary

Tidak ada file baru di luar `components/`; semua perubahan dalam struktur yang sudah ada. Dua komponen layout baru + modifikasi pada section components yang ada.

```
project-root/
├── components/
│   ├── invitation-page.tsx              # [MODIFY] Wrap main dalam SplitLayout, impor komponen baru
│   ├── layout/
│   │   ├── split-layout.tsx             # [NEW] Grid wrapper lg:split + mobile stack, manages photo context
│   │   ├── sticky-photo-panel.tsx       # [NEW] Kolom kiri sticky, foto swap per-section via IntersectionObserver + AnimatePresence, overlay Batak, ember particles, UlosBand
│   │   └── content-panel.tsx            # [NEW] Kolom kanan, bg semi-transparan Batak, border gorga top, overflow-hidden
│   ├── sections/
│   │   ├── hero-section.tsx             # [MODIFY] Adjust dari min-h-100svh standalone ke panel hero; pertahankan countdown + GorgaMark + nama; tambah "Save the Date" pill
│   │   ├── quote-section.tsx            # [MODIFY] Adjust bg ke transparan (di dalam panel), bukan bg-sage-900 full-width; quote italic dengan drop-cap Batak
│   │   ├── couple-section.tsx           # [MODIFY] Remove batak-pattern-light (di dalam panel); PersonCard tetap, tambah ornamen gorga border
│   │   ├── story-section.tsx            # [MODIFY] Adjust bg ke transparan; timeline tetap; ganti bg-sage-900 ke bg-batak-deep/40
│   │   ├── event-section.tsx            # [MODIFY] Section tanggal: angka serif besar (tanggal) di kiri + detail di kanan, di atas foto venue; pertahankan maps iframe
│   │   ├── gallery-section.tsx          # [MODIFY] Grid tetap; adjust ke konteks panel (max-w lebih sempit)
│   │   ├── rsvp-section.tsx             # [MODIFY] Form tetap (rhf + zod); wishlist jadi chat-bubble style (avatar lingkaran inisial + bubble + timestamp relatif + "Muat lebih banyak")
│   │   ├── gift-section.tsx             # [MODIFY] Cards tetap; adjust ke panel
│   │   └── closing-section.tsx          # [MODIFY] Adjust ke footer panel; tetap UlosBand + GorgaMark
│   └── shared/
│       ├── batak-ornament.tsx           # [MODIFY] BatakDivider: tambah GorgaMark di tengah (bukan hanya diamond); tambah variant untuk panel context
│       ├── reveal.tsx                   # [MODIFY] Tidak berubah signifikan; mungkin adjust viewport margin untuk konteks panel
│       ├── section-heading.tsx           # [MODIFY] Tambah variant "overlay" untuk heading di atas foto (uppercase, tracking lebih lebar)
│       └── music-control.tsx             # [NO CHANGE] Tetap fixed bottom-right
├── app/
│   └── globals.css                      # [MODIFY] Tambah utility: .chat-bubble, .panel-gorga-border, .timestamp-relative; adjust .section-shell untuk konteks panel (max-w-3xl)
├── tailwind.config.ts                   # [MODIFY] Tambah backgroundImage untuk foto swap context (jika perlu); tambah keyframe crossfade
└── config/wedding.ts                    # [NO CHANGE] Data-driven, tidak disentuh
```

## Implementation Notes

### Foto Swap Performance

- `StickyPhotoPanel` menggunakan `IntersectionObserver` dengan `rootMargin: "-45% 0px"` agar foto swap terjadi saat section di tengah viewport
- Hanya 1 `<Image>` aktif (AnimatePresence mode="wait"), sisanya unmount — tidak ada memory leak
- Foto pertama `priority`, sisanya `loading="lazy"` — hindari LCP regression

### Chat Bubble RSVP

- Timestamp relatif: fungsi `formatRelativeTime(date)` baru di `lib/utils.ts` ("3 hari lalu", "2 jam lalu", "baru saja")
- "Muat lebih banyak": state `visibleCount` mulai 5, increment 5 — pure client-side slice, tidak fetch ulang
- Avatar inisial: ambil huruf pertama nama, `bg-batak-red text-ivory` lingkaran
- Bubble: `bg-batak-red/12 border border-gold/18 rounded-2xl rounded-tl-sm` (tail kiri)

### Blast Radius Control

- `OpeningCover` dan `MusicControl` TIDAK disentuh — tetap di luar `SplitLayout`
- API routes TIDAK disentuh
- `config/wedding.ts` TIDAK disentuh
- `rsvp-schema.ts` TIDAK disentuh
- Semua section components tetap export function yang sama, hanya adjust internal className
- Jika ada masalah, fallback: `SplitLayout` bisa di-skip dan layout lama tetap berfungsi (section components tetap standalone)

### Logging

- Tidak ada server-side logging baru (semua client-side)
- Error handling RSVP tetap pattern existing (try/catch + setNotice)

### Mobile Responsiveness

- `lg:` breakpoint untuk split-screen (≥1024px)
- < 1024px: single column, foto sticky di-skip (atau jadi background section pertama), section stack normal
- `useReducedMotion` tetap dihormati

## Design Style

Mempertahankan dan memperkaya tema Batak Toba yang sudah ada (gorga, ulos, merah-batak-emas) dengan mengadopsi pola layout split-screen persisten dari viding.co. Pada desktop (≥1024px): dua kolom — kiri foto full-height sticky dengan overlay gelap Batak + ember partikel emas + UlosBand top/bottom; kanan panel konten semi-transparan (bg-batak-ink/95 + backdrop-blur + border gorga atas). Pada mobile: single-column stack, foto menjadi background section pertama, section berikutnya card full-width. Heading serif uppercase Cormorant_Garamond dengan tracking lebar [0.3em+]. Chat bubble ucapan dengan avatar lingkaran merah-batak + inisial + bubble rounded dengan border emas tipis. Section tanggal/acara dengan angka serif raksasa di kiri + detail di kanan. Quote italic serif dengan drop-cap ornamen. Warna tetap palette Batak: merah (#8d2f2b, #4f1f1e, #181312), emas (#b4975a), sand (#d8bd8a), cream/ivory. Tidak ada warna pink viding — diganti rose/batak-red palette.

## Agent Extensions

### Skill

- **agent-browser**
- Purpose: Membuka website referensi christybogart.viding.co untuk verifikasi visual layout split-screen, screenshot per-section, dan memastikan implementasi sesuai pola referensi saat development
- Expected outcome: Screenshot layout desktop & mobile referensi terdokumentasi, pola split-screen persisten terverifikasi untuk diadopsi ke tema Batak