import { z } from "zod";

export const rsvpSchema = z
  .object({
    name: z.string().trim().min(2, "Nama minimal 2 karakter").max(80),
    attendance: z.enum(["attending", "not_attending"]),
    guestCount: z.coerce.number().int().min(0).max(5),
    message: z.string().trim().min(3, "Ucapan minimal 3 karakter").max(500),
    website: z.string().max(0).optional(),
  })
  .refine((data) => data.attendance !== "attending" || data.guestCount >= 1, {
    message: "Jumlah tamu minimal 1 jika hadir",
    path: ["guestCount"],
  });

export type RsvpInput = z.infer<typeof rsvpSchema>;

export type GuestMessage = {
  id: number;
  name: string;
  attendance: "attending" | "not_attending";
  guest_count: number;
  message: string;
  created_at: string;
};
