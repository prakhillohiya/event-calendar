import { google } from "googleapis"
import { oAuth2Client } from "../config/auth"
import { IEvent } from "../schema/eventSchema"



export const getUserDetails = async () => {
  const oAuth2 = await google.oauth2({ version: "v2", auth: oAuth2Client })
  const { data: { id, email, given_name, family_name } } = await oAuth2.userinfo.get()

  return { userId: id, email: email, firstName: given_name, lastName: family_name }
}

export const getUserEvents = async () => {
  const googleCalendar = await google.calendar('v3')

  const { data: { items} } = await googleCalendar.events.list({ calendarId: "primary", auth: oAuth2Client })

  const events: Omit<IEvent, "userId">[] | undefined = items?.map((item: any) => ({
    ...item,
    eventId: item.id,
  }));

  return events
}



export const refreshAccessToken = async (token: string) => {
  try {
    const { credentials } = await oAuth2Client.refreshAccessToken();

    return credentials

  } catch (error) {
    new Error("Invalid Refresh Token");
  }
};

// export const transform = async (token: string) => {
//   try {
//     const { credentials } = await oAuth2Client.refreshAccessToken();

//     return credentials

//   } catch (error) {
//     new Error("Invalid Refresh Token");
//   }
// };




// {
//   "kind": "calendar#event",
//   "etag": "\"3292840558686000\"",
//   "id": "_6sq6ce336cqj0b9p61j3ab9h65im6bb26tj3cbb2c8q64c1hckojiphjcg",
//   "status": "confirmed",
//   "htmlLink": "https://www.google.com/calendar/event?eid=XzZzcTZjZTMzNmNxajBiOXA2MWozYWI5aDY1aW02YmIyNnRqM2NiYjJjOHE2NGMxaGNrb2ppcGhqY2cgcHJha2hpbGxvaGl5YUBt",
//   "created": "2022-03-02T14:37:00.000Z",
//   "updated": "2022-03-04T18:57:59.343Z",
//   "summary": "Blockchain 101: Foundation for a Decentralized Future",
//   "description": "Please join the event here: https://www.airmeet.com/e/74f8c350-90f5-11ec-b7f6-bb4b01e19f3d?code=f6a374b8-e5c6-4b5d-bfa8-24545671de2f\n\nThis link is only for you. Please don't share it with others.\nAirmeet is best experienced from your desktop and on latest Chrome browser(recommended)",
//   "location": "https://www.airmeet.com/e/74f8c350-90f5-11ec-b7f6-bb4b01e19f3d?code=f6a374b8-e5c6-4b5d-bfa8-24545671de2f",
//   "creator": {
//       "email": "prakhillohiya@gmail.com",
//       "self": true
//   },
//   "organizer": {
//       "email": "notifications@airmeet.com",
//       "displayName": "The Product Folks"
//   },
//   "start": {
//       "dateTime": "2022-03-05T14:30:00Z",
//       "timeZone": "UTC"
//   },
//   "end": {
//       "dateTime": "2022-03-05T16:00:00Z",
//       "timeZone": "UTC"
//   },
//   "iCalUID": "74f8c350-90f5-11ec-b7f6-bb4b01e19f3d",
//   "sequence": 0,
//   "attendees": [
//       {
//           "email": "prakhillohiya@gmail.com",
//           "self": true,
//           "responseStatus": "needsAction"
//       }
//   ],
//   "guestsCanInviteOthers": false,
//   "privateCopy": true,
//   "reminders": {
//       "useDefault": true
//   },
//   "eventType": "default"
// }