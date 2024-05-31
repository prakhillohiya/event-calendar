import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timeGrid";
import { useCustomQueryClient } from "@/config/queryClient";
import { Box, LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { IFullCalendarEvent, IGoogleEvent } from "@/schema/eventSchema";
import { transformEvents } from "@/utils/utils";
import { EventClickArg } from "@fullcalendar/core/index.js";
import { useDialog } from "@/context/DialogProvider";

export default function Calendar() {
  const [events, setEvents] = useState<IFullCalendarEvent[]>([]);

  const { openDialog, setIsOpen } = useDialog();

  const {
    isLoading: queryLoading,
    error: queryError,
    data: queryData,
    isSuccess: querySuccess,
    refetch,
  } = useCustomQueryClient<any>({
    url: `${import.meta.env.VITE_BASE_URI}/event/fetchAll`,
    method: "get",
    queryKey: "getAllEvents",
    enabled: true,
  });

  useEffect(() => {
    if (querySuccess) {
      const transformedEvents = transformEvents(queryData?.data.data[0].events);
      setEvents(transformedEvents);
    }
  }, [queryLoading]);

  const handleEventClick = (e: EventClickArg) => {
    e.jsEvent.preventDefault();
    e.jsEvent.stopPropagation();
    console.log(e.event.toPlainObject());
  };

  const handleAddEvent = () => {
    openDialog()
  };

  if (queryLoading) {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin]}
      initialView="dayGridMonth"
      events={events}
      eventClick={(e) => handleEventClick(e)}
      headerToolbar={{
        start: "dayGridMonth,timeGridWeek prev,next today",
        end: "addEvent",
        center: "title",
      }}
      customButtons={{
        addEvent: {
          text: "Add Event",
          click: handleAddEvent,
        },
      }}
    />
  );
}
