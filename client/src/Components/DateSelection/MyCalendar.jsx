import React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

const MyCalendar = ({ dispatch, selectedDate }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateCalendar"]}>
        <DateCalendar
          referenceDate={dayjs()}
          views={["year", "month", "day"]}
          value={selectedDate ? dayjs(selectedDate) : null}
          onChange={(date) =>
            dispatch({
              type: "SET_DATE",
              payload: dayjs(date).format("YYYY-MM-DD"),
            })
          }
          sx={{
            color: "black", // Default text color
            // "& .MuiTypography-root": {
            //   color: "black", // General typography (e.g., years, days names)
            // },
            "& .MuiPickersDay-root": {
              color: "black", // Day numbers
              "&:hover": {
                backgroundColor: "#f0f0f0", // Optional hover effect
              },
              //   "&.Mui-selected": {
              //     backgroundColor: "#1976d2", // Selected day background
              //     color: "white", // Selected day text
              //   },
              // },
              // "& .MuiPickersCalendarHeader-root": {
              //   color: "black", // Month and year header
              // },
              // "& .MuiPickersSlideTransition-root": {
              //   color: "black", // Transitioning months
              // },
              // "& .MuiDayCalendar-weekDayLabel": {
              //   color: "black", // Day names (e.g., Sun, Mon)
              // },
              // "& .MuiButtonBase-root": {
              //   color: "black", // Navigation buttons
            },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default MyCalendar;
