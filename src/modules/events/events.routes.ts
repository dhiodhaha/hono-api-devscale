import { Hono } from "hono";
import { prisma } from "../../shared/lib/prisma.js";
import { zValidator } from "@hono/zod-validator";
import { createEventSchema, updateEventSchema } from "./event.validator.js";

export const eventsRoute = new Hono()
  .get("/", async (c) => {
    const events = await prisma.event.findMany({
      include: { participants: true },
    });
    return c.json({ events }, 200);
  })
  .get("/:id", async (c) => {
    const id = c.req.param("id");
    const event = await prisma.event.findUnique({
      where: {
        id: id,
      },
      include: {
        participants: true,
      },
    });
    return c.json({ event }, 200);
  })
  .post("/", zValidator("json", createEventSchema), async (c) => {
    const body = c.req.valid("json");
    const newEvent = await prisma.event.create({
      data: body,
    });
    return c.json({ event: newEvent }, 201);
  })
  .patch("/:id", zValidator("json", updateEventSchema), async (c) => {
    const id = c.req.param("id");
    const body = c.req.valid("json");
    const updateEvent = await prisma.event.update({
      where: {
        id: id,
      },
      data: body,
    });
    return c.json({ event: updateEvent }, 200);
  })
  .delete("/:id", async (c) => {
    const id = c.req.param("id");
    await prisma.event.delete({ where: { id: id } });
    return c.json({ message: `Event deleted successfully` });
  });
