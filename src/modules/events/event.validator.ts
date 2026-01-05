import z from "zod";

export const createEventSchema = z.object({
  title: z.string().min(2, "Title is required").max(50),
  description: z.string().min(2, "Description is required").max(1000),
  location: z.string().min(2, "Location is required").max(100),
  dateTime: z.iso.datetime(),
});

export const updateEventSchema = createEventSchema.partial();
