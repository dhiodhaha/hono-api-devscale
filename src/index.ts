import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { eventsRoute } from "./modules/events/events.routes.js";
import { participantsRoute } from "./modules/participants/participants.routes.js";

const app = new Hono();

app.route("/events", eventsRoute);
app.route("/participants", participantsRoute);

serve(
  {
    fetch: app.fetch,
    port: 8000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
