import { InvitationPage } from "@/components/invitation-page";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function GuestPage({ params }: PageProps) {
  const { slug } = await params;

  // Fetch guest data from API
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const res = await fetch(`${siteUrl}/api/guest/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    notFound();
  }

  const guest = await res.json();

  return <InvitationPage guestName={guest.name} maxCompanions={guest.maxCompanions} />;
}
