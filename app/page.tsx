import { InvitationPage } from "@/components/invitation-page";

type PageProps = {
  searchParams: Promise<{ to?: string | string[] }>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const rawGuest = Array.isArray(params.to) ? params.to[0] : params.to;
  const guestName = rawGuest?.trim().slice(0, 80) || "Bapak/Ibu/Saudara/i";

  return <InvitationPage guestName={guestName} />;
}
