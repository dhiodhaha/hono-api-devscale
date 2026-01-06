import { HTTPException } from "hono/http-exception";

export class EventNotFoundException extends HTTPException {
  constructor(eventId: string) {
    super(404, {
      message: `Event with ID "${eventId}" not found`,
    });
    this.name = "EventNotFoundException";
  }
}
