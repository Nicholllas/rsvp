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

export const weddingConfig = {
  couple: {
    shortNames: "Alin & Richard",
    bride: {
      name: "Alin Putri Maheswari",
      nickname: "Alin",
      image: "/images/bride.svg",
      description: "Putri pertama dari",
      parents: "Bapak H. Arief Mahendra & Ibu Hj. Ratna Wulandari",
      instagram: "https://instagram.com/",
    },
    groom: {
      name: "Richard Aditya Pratama",
      nickname: "Richard",
      image: "/images/groom.svg",
      description: "Putra kedua dari",
      parents: "Bapak Drs. Bambang Pratama & Ibu Dra. Sari Kusuma",
      instagram: "https://instagram.com/",
    },
  },
  weddingDate: "2027-06-26T08:00:00+07:00",
  timezone: "Asia/Jakarta",
  quote: {
    text: "Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya.",
    source: "QS. Ar-Rum: 21",
  },
  story: [
    {
      year: "2021",
      title: "Pertama Bertemu",
      description:
        "Sebuah pertemuan sederhana di antara teman-teman membawa dua cerita ke satu halaman yang sama.",
    },
    {
      year: "2023",
      title: "Tumbuh Bersama",
      description:
        "Kami belajar bahwa rumah bukan hanya tempat, tetapi seseorang yang selalu mengusahakan pulang.",
    },
    {
      year: "2026",
      title: "Satu Tujuan",
      description:
        "Dengan restu keluarga, kami memilih melanjutkan perjalanan ini sebagai satu keluarga.",
    },
  ],
  events: [
    {
      id: "akad",
      title: "Akad Nikah",
      date: "2027-06-26T08:00:00+07:00",
      endDate: "2027-06-26T10:00:00+07:00",
      time: "08.00 – 10.00 WIB",
      venue: "The Glass House",
      address: "Jl. Gatot Subroto No. 42, Jakarta Selatan",
      mapsUrl: "https://maps.google.com/?q=Jakarta+Convention+Center",
      mapsEmbedUrl:
        "https://www.google.com/maps?q=Jakarta%20Convention%20Center&output=embed",
    },
    {
      id: "reception",
      title: "Resepsi & Pesta Adat",
      date: "2027-06-26T11:00:00+07:00",
      endDate: "2027-06-26T14:00:00+07:00",
      time: "11.00 – 14.00 WIB",
      venue: "The Glass House",
      address: "Jl. Gatot Subroto No. 42, Jakarta Selatan",
      mapsUrl: "https://maps.google.com/?q=Jakarta+Convention+Center",
      mapsEmbedUrl:
        "https://www.google.com/maps?q=Jakarta%20Convention%20Center&output=embed",
    },
  ] satisfies WeddingEvent[],
  gallery: [
    {
      src: "/images/gallery-1.svg",
      alt: "Alin dan Richard berjalan bersama",
      className: "sm:col-span-2",
    },
    {
      src: "/images/gallery-2.svg",
      alt: "Detail bunga pernikahan",
      className: "",
    },
    {
      src: "/images/gallery-3.svg",
      alt: "Momen hangat Alin dan Richard",
      className: "",
    },
    {
      src: "/images/gallery-4.svg",
      alt: "Cincin pernikahan",
      className: "sm:col-span-2",
    },
  ],
  gifts: [
    {
      bank: "Bank Central Asia (BCA)",
      accountNumber: "1234567890",
      accountName: "Alin Putri Maheswari",
    },
    {
      bank: "GoPay",
      accountNumber: "081234567890",
      accountName: "Richard Aditya Pratama",
    },
  ],
  closingMessage:
    "Kehadiran dan doa restu Anda adalah hadiah terindah bagi kami.",
  music: {
    title: "Marry Me",
    src: "/audio/marry-me.m4a",
  },
} as const;
