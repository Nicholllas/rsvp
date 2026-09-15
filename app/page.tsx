import { InvitationPage } from "@/components/invitation-page";

export default function Page({ searchParams }: { searchParams?: { to?: string | string[] } }) {
  const rawGuest = Array.isArray(searchParams?.to) ? searchParams?.to[0] : searchParams?.to;
  const guestName = rawGuest?.trim().slice(0, 80) || "Bapak/Ibu/Saudara/i";

  return <InvitationPage guestName={guestName} />;
}
