import { HTTPException } from "hono/http-exception";

export class EventNotFoundException extends HTTPException {
  constructor(eventId: string) {
    super(404, {
      message: `Event with ID "${eventId}" not found`,
    });
    this.name = "EventNotFoundException";
  }
}
export class EventAlreadyExistsException extends HTTPException {
  constructor(title: string) {
    super(409, {
      message: `Event with title "${title}" already exists`,
    });
    this.name = "EventAlreadyExistsException";
  }
}
export class EventTitleTooLongException extends HTTPException {
  constructor(title: string) {
    super(400, {
      message: `Event title "${title}" is too long`,
    });
    this.name = "EventTitleTooLongException";
  }
}
