import { Hono } from "hono";

export const participantsRoute = new Hono()
  .get("/", (c) => {
    return c.json({ participants: [] });
  })
  .get("/:id", (c) => {
    const id = c.req.param("id");
    return c.json({ participants: id });
  })
  .post("/", (c) => {
    return c.json({ participants: "created" });
  })
  .patch("/:id", (c) => {
    const id = c.req.param("id");
    return c.json({ participants: id });
  })
  .delete("/:id", (c) => {
    const id = c.req.param("id");
    return c.json({ participants: id });
  });
