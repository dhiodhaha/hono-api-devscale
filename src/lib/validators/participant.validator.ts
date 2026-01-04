import z from "zod";

export const createParticipantSchema = z.object({
  name: z.string().min(2, "Name is required").max(100),
  email: z.email("Invalid email").max(100),
});

export const updateParticipantSchema = z.object({
  name: z.string().min(2, "Name is required").max(100).optional(),
  email: z.email("Invalid email").max(100).optional(),
});
