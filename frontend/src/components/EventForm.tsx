import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, EventType, useFieldArray, useForm } from "react-hook-form";
import { IEvent, IFullCalendarEvent, IGoogleEvent } from "@/schema/eventSchema";
import { Box, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

const EventForm = () => {
  const {
    control,
    register,
    unregister,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    getFieldState,
    setError,
    clearErrors,
    formState: {
      isDirty,
      isSubmitSuccessful,
      isSubmitting,
      isSubmitted,
      isValid,
    },
  } = useForm<IGoogleEvent>({
    defaultValues: {},
    // resolver: zodResolver(ZEvent),
  });

  // const { fields, append, remove } = useFieldArray<IGoogleEvent>({
  //   control,
  //   name: "profile.education",
  // });

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#eaeaea",
        overflow: "auto",
      }}
    >
      <div className="w-full flex flex-col mt-0 p-8 bg-white rounded-md overflow-auto h-[100%]">
        <Controller
          control={control}
          name="summary"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextField
              inputRef={ref}
              onChange={onChange}
              // error={!!getFieldState("profile.basic.name").error?.message}
              // helperText={getFieldState("profile.basic.name").error?.message}
              onBlur={onBlur}
              value={value || ""}
              id="outlined-name-input"
              label="Name"
              type="text"
              sx={{ margin: "1rem" }}
            />
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextField
              inputRef={ref}
              onChange={onChange}
              // error={!!getFieldState("profile.basic.name").error?.message}
              // helperText={getFieldState("profile.basic.name").error?.message}
              onBlur={onBlur}
              value={value || ""}
              id="outlined-name-input"
              label="Name"
              type="text"
              sx={{ margin: "1rem" }}
            />
          )}
        />

        <Controller
          control={control}
          name="start.dateTime"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                   inputRef={ref}
                    // slotProps={{
                    //   textField: {
                    //     helperText: getFieldState(
                    //       `description`
                    //     ).error?.message,
                    //   },
                    // }}
                    format="DD/MM/YYYY"
                    label="Start Date"
                    onChange={(date) => onChange(dayjs(date).toISOString())}
                    // value={dayjs(value).isValid() ? dayjs(value) : value}
                    sx={{ margin: "1rem",width:"100%" }}
                  />
                </LocalizationProvider>
          )}
        />

        <Controller
          control={control}
          name="end.dateTime"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                   inputRef={ref}
                    // slotProps={{
                    //   textField: {
                    //     helperText: getFieldState(
                    //       `description`
                    //     ).error?.message,
                    //   },
                    // }}
                    format="DD/MM/YYYY"
                    label="Start Date"
                    onChange={(date) => onChange(dayjs(date).toISOString())}
                    // value={dayjs(value).isValid() ? dayjs(value) : value}
                    sx={{ margin: "1rem",width:"100%" }}
                  />
                </LocalizationProvider>
          )}
        />

        <Controller
          control={control}
          name="attendees"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="en"
          >
            <TimePicker
              // onChange={(time) => onChange(dayjs(time).toISOString())}
              // value={dayjs(value).isValid() ? dayjs(value) : null}
              slotProps={{
                textField: {
                  size: "small",
                  sx: {
                    "& .MuiInputBase-root .MuiOutlinedInput-notchedOutline":
                      {
                        border: 0,
                      },
                  },
                  placeholder: "Choose event time",
                  id: "time",
                },
              }}
            />
          </LocalizationProvider>
          )}
        />



      </div>
    </Box>
  );
};

export default EventForm;
