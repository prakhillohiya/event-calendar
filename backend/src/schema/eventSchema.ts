import { Schema, Types } from "mongoose";
import { boolean, z } from "zod";


const isValidObjectId = (value: string | Types.ObjectId): boolean => {
  return Types.ObjectId.isValid(value);
};

const objectIdSchema = z.custom<string | Types.ObjectId>((value) => {
  if (typeof value !== "string" || !isValidObjectId(value)) {
    throw new Error("Invalid MongoDB ObjectId");
  }
  return value;
});

export const ZEvent = z.object({
  _id: z.string().optional(),
  userId:objectIdSchema,
  eventId: z.string(),
  created: z.string(),
  updated: z.string(),
  summary: z.string(),
  creator: z.object({
    email: z.string(),
    displayName: z.string(),
    self: z.boolean()
  }),
  organizer: z.object({
    email: z.string(),
    displayName: z.string(),
    self: z.boolean()
  }),
  start: z.object({
    dateTime: z.string(),
    timeZone: z.string()
  }),
  end: z.object({
    dateTime: z.string(),
    timeZone: z.string()
  }),
  location: z.string(),
  description: z.string(),
  attendees: z.array(z.object({
    email: z.string(),
    self: z.boolean(),
    responseStatus: z.string()
  }))
});

type EventType = z.infer<typeof ZEvent>;

export interface IEvent extends EventType { }


export const eventSchema = new Schema<IEvent>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  eventId: { type: String, required: true },
  created: { type: String, required: true },
  updated: { type: String, required: true },
  summary: { type: String, required: false },
  creator: {
    email: {
      type: String, required: false
    }, displayName: {
      type: String, required: false
    }, self: {
      type: Boolean, required: false
    }
  },
  organizer: {
    email: {
      type: String, required: false
    }, displayName: {
      type: String, required: false
    }, self: {
      type: Boolean, required: false
    }
  },
  start: {
    dateTime: {
      type: String, required: false
    }, timeZone: {
      type: String, required: false
    }
  },
  end: {
    dateTime: {
      type: String, required: false
    }, timeZone: {
      type: String, required: false
    }
  },
  location: {
    type: String, required: false
  },
  description: {
    type: String, required: false
  },
  attendees: [{
    email: {
      type: String, required: false
    }, responseStatus: {
      type: String, required: false
    }, self: {
      type: Boolean, required: false
    }
  }]
});
