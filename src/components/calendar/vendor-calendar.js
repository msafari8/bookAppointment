import { enUS } from "date-fns/locale";
import { DatePickerCalendar } from "react-nice-dates";
import "react-nice-dates/build/style.css";

import { isVendorAvailableByDay } from "./logic";

export default function VendorCalendar(props) {
  const availabilities = props.availabilities || [];

  let modifiers = {
    disabled: (date) => !isVendorAvailableByDay(date, availabilities), //disable Not Available Day
  };
  if (!availabilities.length) {
    modifiers = { disabled: (date) => true }; // if no availabilities, disable the calendar selection
  }

  const handleDayClick = (date) => {
    if (typeof props.onDateChange === "function") {
      props.onDateChange(date);
    }
  };

  return (
    <div className="calendarComponent-container calendar-flex-item">
      <div className="nice-calendar-container">
        <DatePickerCalendar
          date={props.selectedDay}
          minimumDate={new Date()}
          modifiers={modifiers}
          locale={enUS}
          onDateChange={handleDayClick}
        />
      </div>
    </div>
  );
}
