import z from "zod";

export const createParticipantSchema = z.object({
  name: z.string().min(2, "Name is required").max(100),
  email: z.email("Invalid email").max(100),
  eventId: z.cuid("Invalid event ID").max(100),
});

export const updateParticipantSchema = createParticipantSchema.partial();
