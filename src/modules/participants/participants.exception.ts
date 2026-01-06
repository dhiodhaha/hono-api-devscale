import { HTTPException } from "hono/http-exception";

export class ParticipantNotFoundException extends HTTPException {
  constructor(participantId: string) {
    super(404, {
      message: `Participant with ID "${participantId}" not found`,
    });
    this.name = "ParticipantNotFoundException";
  }
}
