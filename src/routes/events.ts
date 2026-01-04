import { Hono } from "hono";
import { prisma } from "../lib/utils/prisma.js";
import { zValidator } from "@hono/zod-validator";
import {
  createEventSchema,
  updateEventSchema,
} from "../lib/validators/event.validator.js";

export const eventsRoute = new Hono()
  .get("/", async (c) => {
    const events = await prisma.event.findMany();
    return c.json({ events });
  })
  .get("/:id", async (c) => {
    const id = c.req.param("id");
    const event = await prisma.event.findUnique({
      where: {
        id: id,
      },
    });
    return c.json({ event });
  })
  .post("/", zValidator(`json`, createEventSchema), async (c) => {
    const body = c.req.valid(`json`);
    const newEvent = await prisma.event.create({
      data: {
        title: body.title,
        description: body.description,
        location: body.location,
        dateTime: body.dateTime,
      },
    });
    return c.json({ event: newEvent }, 201);
  })
  .patch("/:id", zValidator(`json`, updateEventSchema), async (c) => {
    const id = c.req.param("id");
    const body = c.req.valid(`json`);
    const updateEvent = await prisma.event.update({
      where: {
        id: id,
      },
      data: {
        title: body.title,
        description: body.description,
        location: body.location,
        dateTime: body.dateTime,
      },
    });
    return c.json({ event: updateEvent }, 201);
  })
  .delete("/:id", async (c) => {
    const id = c.req.param("id");
    await prisma.event.delete({ where: { id: id } });
    return c.json({ message: `Event deleted successfully` });
  });
