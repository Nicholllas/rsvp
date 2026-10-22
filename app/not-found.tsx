import { Home, Mail } from "lucide-react";
import Link from "next/link";

import { GorgaMark } from "@/components/shared/batak-ornament";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-batak-ink px-5 text-center text-ivory">
      <GorgaMark className="mb-6 text-gold" />
      
      <h1 className="font-serif text-4xl font-semibold sm:text-5xl">Undangan Tidak Ditemukan</h1>
      
      <p className="mt-4 max-w-md text-sm text-ivory/70">
        Link undangan yang Anda buka tidak valid atau sudah tidak aktif.
        Silakan periksa kembali link yang diberikan atau hubungi penyelenggara acara.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link href="/">
          <Button className="bg-gold text-batak-ink hover:bg-[#cfb578]">
            <Home className="mr-2 h-4 w-4" />
            Halaman Utama
          </Button>
        </Link>
        
        <a href="mailto:alin.richard@example.com">
          <Button variant="outline" className="border-gold/30 text-ivory hover:bg-gold/10">
            <Mail className="mr-2 h-4 w-4" />
            Hubungi Kami
          </Button>
        </a>
      </div>

      <div className="mt-12 text-xs text-ivory/40">
        Alin & Richard Wedding · 14 November 2026
      </div>
    </div>
  );
}
