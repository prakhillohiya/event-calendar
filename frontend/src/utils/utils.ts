import { FullCalendarType, GoogleEventType, IGoogleEvent } from "@/schema/eventSchema";



export const transformEvents = (event: GoogleEventType[]): FullCalendarType[] => {
  console.log(event)
  return event.map(x => {
    return {
      id: x.eventId,
      // groupId: undefined,
      // allDay: false,
      start: x.start.dateTime,
      end: x.end.dateTime,
      // startStr: event.start.dateTime,
      // endStr: event.end.dateTime,
      title: x.summary,
      // url: x.location,
      // classNames: [],
      editable: false,
      // startEditable: true,
      // durationEditable: true,
      // resourceEditable: true,
      // display: 'auto',
      // overlap: true,
      // constraint: null,
      // backgroundColor: '',
      // borderColor: '',
      // textColor: '',
      extendedProps: {
        creator: x.creator,
        organizer: x.organizer,
        attendees: x.attendees,
        description: x.description,
        userId: x.userId,
        created: x.created,
        updated: x.updated,
      },
      source: "google",
    }
  })

}