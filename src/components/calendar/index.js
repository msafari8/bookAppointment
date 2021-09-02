import React, { useState, useEffect } from "react";

import {
  sortAndFormatAvailabilities,
  findVendorAvailabliesByDay,
} from "./logic";
import VendorCalendar from "./vendor-calendar";
import VendorInfo from "./vendor-info";
import VendorTimeSlots from "./vendor-timeslots";
import VendorBooking from "./vendor-booking";

import {
  getBookingsByVendorNameDate,
  getVendorAvailabilities,
} from "./api-calls";

import "./style.css";

export default function Calendar() {
  const [vendorAvailabilities, setVendorAvailabilities] = useState([]);
  const [vendorBookedSlots, setVendorBookedSlots] = useState([]);
  const [vendorName, setVendorName] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTimeslot, setSelectedTimeslot] = useState(null);
  const [availableSlots, setAvailableSlots] = useState(null);

  useEffect(() => {
    getVendorAvailabilities().then((response) => {
      if (response.success) {
        const vendorAvailabilities = sortAndFormatAvailabilities(
          response.data.calendar
        );
        setVendorAvailabilities(vendorAvailabilities);
        setVendorName(response.data.vendor.name);
      }
    });
  }, []);

  const handleTimeSlotClick = (date) => {
    setSelectedTimeslot(date);
  };

  const handleDayClick = (date) => {
    setIsLoading(true);
    getBookingsByVendorNameDate(vendorName, date).then((response) => {
      let arrData = [];
      response.data.forEach((item) => {
        arrData.push(item["booking_date"]); //remove the key and turn into array for easier checks
      });
      setVendorBookedSlots(arrData);
      setIsLoading(false);
    });

    setSelectedDay(date);

    setAvailableSlots(findVendorAvailabliesByDay(date, vendorAvailabilities));
  };

  // when booking is done, hide the slots
  const handleBookingDone = () => {
    setSelectedDay(null);
  };

  // reset the calendar
  const handleReset = () => {
    setSelectedDay(null);
    setSelectedTimeslot(null);
  };

  return (
    <div
      className={
        "calendar-app-demo-container" + (selectedDay ? " --expanded" : "")
      }
    >
      <div className="calendarComponent-wrapper">
        <VendorInfo
          name={vendorName}
          selectedDay={selectedDay}
          isLoading={isLoading}
        />

        {selectedTimeslot && (
          <VendorBooking
            name={vendorName}
            selectedDay={selectedDay}
            selectedTimeslot={selectedTimeslot}
            onBookingDone={handleBookingDone}
            onReset={handleReset}
          />
        )}

        {!selectedTimeslot && (
          <VendorCalendar
            onDateChange={handleDayClick}
            availabilities={vendorAvailabilities}
            selectedDay={selectedDay}
          />
        )}

        {selectedDay && (
          <VendorTimeSlots
            availableSlots={availableSlots}
            onTimeslotClick={handleTimeSlotClick}
            isLoading={isLoading}
            bookedSlots={vendorBookedSlots}
          />
        )}
      </div>
    </div>
  );
}
