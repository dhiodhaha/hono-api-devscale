import { Hono } from "hono";
import { prisma } from "../../shared/lib/prisma.js";
import { zValidator } from "@hono/zod-validator";
import {
  createParticipantSchema,
  updateParticipantSchema,
} from "./participant.validator.js";

export const participantsRoute = new Hono()
  .get("/", async (c) => {
    const participants = await prisma.event.findMany({
      include: { participants: true },
    });
    return c.json({ participants }, 200);
  })
  .get("/:id", async (c) => {
    const id = c.req.param("id");
    const participant = await prisma.participant.findUnique({
      where: {
        id: id,
      },
    });
    return c.json({ participant }, 200);
  })
  .post("/", zValidator("json", createParticipantSchema), async (c) => {
    const body = c.req.valid("json");
    const newParticipant = await prisma.participant.create({
      data: body,
    });
    return c.json({ participant: newParticipant }, 201);
  })
  .patch("/:id", zValidator("json", updateParticipantSchema), async (c) => {
    const id = c.req.param("id");
    const body = c.req.valid("json");
    const updateParticipant = await prisma.participant.update({
      where: {
        id: id,
      },
      data: body,
    });
    return c.json({ participant: updateParticipant }, 200);
  })
  .delete("/:id", async (c) => {
    const id = c.req.param("id");
    await prisma.participant.delete({ where: { id: id } });
    return c.json({ message: "Participant deleted successfully" }, 200);
  });
