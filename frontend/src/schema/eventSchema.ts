import { boolean, z } from "zod";

export const ZFullCalendarEvent = z.object({
  id: z.string(),
  groupId: z.string().optional(),
  allDay: z.boolean().optional(),
  start: z.string(),
  end: z.string(),
  startStr: z.string().optional(),
  endStr: z.string().optional(),
  title: z.string(),
  url: z.string().optional(),
  classNames: z.array(z.string()).optional(),
  editable: z.boolean(),
  startEditable: z.boolean().optional(),
  durationEditable: z.boolean().optional(),
  resourceEditable: z.boolean().optional(),
  display: z.string().optional(),
  overlap: z.boolean().optional(),
  constraint: z.any().optional(),
  backgroundColor: z.string().optional(),
  borderColor: z.string().optional(),
  textColor: z.string().optional(),
  extendedProps: z.object({
    creator: z.object({
      email: z.string(),
      displayName: z.string().optional(),
      self: z.boolean().optional(),
    }).optional(),
    organizer: z.object({
      email: z.string(),
      displayName: z.string().optional(),
      self: z.boolean().optional(),
    }).optional(),
    attendees: z.array(z.object({
      email: z.string(),
      self: z.boolean().optional(),
      responseStatus: z.string().optional(),
    })).optional(),
    description: z.string().optional(),
    userId: z.string().optional(),
    created: z.string(),
    updated: z.string(),

  }),
  source: z.any().optional(),
});


export type FullCalendarType = z.infer<typeof ZFullCalendarEvent>;

export interface IFullCalendarEvent extends FullCalendarType { }


export const ZGoogleEvent = z.object({
  _id: z.string().optional(),
  userId: z.string(),
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
    self: z.boolean().optional(),
    responseStatus: z.string().optional()
  }))
});

export type GoogleEventType = z.infer<typeof ZGoogleEvent>;

export interface IGoogleEvent extends GoogleEventType { }


export const ZEvent = z.object({
  id:z.string(),
  title:z.string(),
  description:z.string(),
  attendees:z.array(z.string()),
  date:z.string(),
  time:z.string(),
  duration:z.string(),
  notes:z.string()
});


export type EventType = z.infer<typeof ZEvent>;

export interface IEvent extends EventType { }