export type WeddingEvent = {
  id: "akad" | "reception";
  title: string;
  date: string;
  endDate: string;
  time: string;
  venue: string;
  address: string;
  mapsUrl: string;
  mapsEmbedUrl: string;
};

export type StoryMoment = {
  id: string;
  date: string;
  title: string;
  description: string;
  highlight: string;
};

export const weddingConfig = {
  couple: {
    shortNames: "Alin & Richard",
    bride: {
      name: "Ovalina Mia Anastasia",
      nickname: "Alin",
      image: "/images/alin-richard/bride.jpg",
      imageFit: "cover",
      imagePosition: "center",
      description: "Anak pertama dari",
      parents: "Alm. Bapak Taruli Hutabarat & Almh. Ibu Ratna Lawati",
      instagram: "https://www.instagram.com/ovalinamia18/",
      instagramHandle: "ovalinamia18",
    },
    groom: {
      name: "Richard",
      nickname: "Richard",
      image: "/images/alin-richard/groom.jpg",
      imageFit: "cover",
      imagePosition: "center",
      description: "Anak kelima dari ",
      parents: "Alm. Bapak Aron Sianipar & Almh. Ibu Rauli Hutapea",
      instagram: "https://www.instagram.com/dr.richard_lee/",
      instagramHandle: "Richard",
    },
  },
  weddingDate: "2026-11-14T08:00:00+07:00",
  timezone: "Asia/Jakarta",
  quote: {
    text: "Demikianlah mereka bukan lagi dua, melainkan satu. Karena itu, apa yang telah dipersatukan Allah, tidak boleh diceraikan manusia.",
    source: "Matius 19:6",
  },
  story: [
    {
      id: "awal-kenal",
      date: "Juli 2025",
      title: "Awal Kenal",
      description:
        "Semua bermula di sebuah toko retail, di sela percakapan singkat yang tak pernah kami rencanakan. Waktu itu kami hanya dua orang yang saling kenal sebagai teman, lalu bertukar nomor tanpa tahu apa yang akan tumbuh dari sana.",
      highlight: "Sebuah perkenalan biasa — yang ternyata bukan hal biasa.",
    },
    {
      id: "hilang-kabar",
      date: "Juli – Des 2025",
      title: "Hilang Kabar",
      description:
        "Nomor sudah bertukar, tetapi percakapan berhenti di tengah jalan. Kami kembali sibuk dengan dunia masing-masing, dan untuk beberapa bulan nama itu hanya tersimpan diam di daftar kontak.",
      highlight: "Ada masa ketika kami hanya menjadi nama yang tak pernah dibuka.",
    },
    {
      id: "kabar-yang-kembali",
      date: "Januari 2026",
      title: "Kabar yang Kembali",
      description:
        "Sampai akhirnya satu pesan sederhana dikirim lagi. Pintu yang kami kira sudah tertutup ternyata hanya menunggu diketuk, dan obrolan kami mengalir seolah tidak pernah benar-benar berhenti.",
      highlight: "Yang tertunda, ternyata belum tentu yang terlewat.",
    },
    {
      id: "memilih-bersama",
      date: "2026",
      title: "Memilih untuk Bersama",
      description:
        "Percakapan yang tadinya ringan perlahan menjadi lebih dalam. Kami memutuskan menjalani ini bersama — bukan karena semuanya mudah, tetapi karena kami ingin menghadapi hari-hari itu berdua.",
      highlight: "Kami tidak hanya saling menemukan, kami saling memilih.",
    },
    {
      id: "menuju-selamanya",
      date: "14 · 11 · 2026",
      title: "Obrolan Menuju Selamanya",
      description:
        "Arah obrolan kami pun berubah: dari rencana kecil menjadi doa, restu keluarga, dan tanggal yang kami tunggu. Dengan langkah pelan tetapi pasti, kami berjalan menuju hari pernikahan — dan ingin Anda ada di sana.",
      highlight: "Bukan akhir cerita, melainkan awal yang kami doakan.",
    },
  ] satisfies StoryMoment[],
  events: [
    {
      id: "akad",
      title: "Pemberkatan Nikah",
      date: "2026-11-14T08:00:00+07:00",
      endDate: "2026-11-14T10:00:00+07:00",
      time: "10.00 – 12.00 WIB",
      venue: "Gereja GBI Harapan Indah",
      address: "-",
      mapsUrl: "https://maps.google.com/?q=Gereja+GBI+Harapan+Indah",
      mapsEmbedUrl:
        "https://www.google.com/maps?q=Gereja+GBI+Harapan+Indah&output=embed",
    },
    {
      id: "reception",
      title: "Resepsi & Pesta Adat",
      date: "2026-11-14T11:00:00+07:00",
      endDate: "2026-11-14T14:00:00+07:00",
      time: "13.00 – Selesai",
      venue: "TeRasa Cafe",
      address: "Blok A No. 1, Perum Dutabumi 2 Jl. Harapan Indah Raya, RT.001/RW.029, Pejuang, Kecamatan Medan Satria, Kota Bks, Jawa Barat 17131",
      mapsUrl: "https://maps.app.goo.gl/zdrtTJadH31P8u2p9?g_st=awb",
      mapsEmbedUrl:
        "https://www.google.com/maps?q=TeRasa+Cafe&output=embed",
    },
  ] satisfies WeddingEvent[],
  gallery: [
    {
      src: "/images/alin-richard/01.jpg",
      alt: "Alin dan Richard berjalan bersama",
      className: "sm:col-span-2",
    },
    {
      src: "/images/alin-richard/02.jpg",
      alt: "Berpelukan dalam busana adat Batak",
      className: "",
    },
    {
      src: "/images/alin-richard/03.jpg",
      alt: "Saling menghadap, momen hangat",
      className: "",
    },
    {
      src: "/images/alin-richard/04.jpg",
      alt: "Pose dramatis dengan tongkat dan kotak gorga",
      className: "sm:col-span-2",
    },
    {
      src: "/images/alin-richard/05.jpg",
      alt: "Richard berdiri tegak, Alin di samping",
      className: "",
    },
    {
      src: "/images/alin-richard/06.jpg",
      alt: "Berdiri dekat, detail ulos",
      className: "",
    },
    {
      src: "/images/alin-richard/07.jpg",
      alt: "Richard duduk, Alin berdiri",
      className: "sm:col-span-2",
    },
  ],
  gifts: [
    {
      bank: "Bank Central Asia (BCA)",
      accountNumber: "0940771251",
      accountName: "Ovalina Mia Anastasia",
    },
    {
      bank: "Dana",
      accountNumber: "089507601896",
      accountName: "Ovalina Mia Anastasia",
    },
  ],
  closingMessage:
    "Kehadiran dan doa restu Anda adalah hadiah terindah bagi kami.",
  music: {
    title: "Marry Me",
    src: "/audio/marry-me.m4a",
  },
} as const;
