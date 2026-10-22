import { InvitationPage } from "@/components/invitation-page";

type PageProps = {
  searchParams: Promise<{ to?: string | string[] }>;
};

// Root page: fallback mode for backward compatibility with ?to= query param
// For personalized invitations, use /[slug] instead
export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const rawGuest = Array.isArray(params.to) ? params.to[0] : params.to;
  const guestName = rawGuest?.trim().slice(0, 80) || "Bapak/Ibu/Saudara/i";

  return <InvitationPage guestName={guestName} maxCompanions={0} />;
}
