import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { Loading } from "../../helpers/common";
import React, { useState, useEffect } from "react";

export default function VendorTimeSlots(props) {
  const availableSlots = props.availableSlots || [];
  const bookedSlots = props.bookedSlots || [];
  const isLoading = props.isLoading || false;

  const [availableSlotItems, setAvailableSlotItems] = useState([]);

  useEffect(() => {
    let availableSlotItems = [];
    availableSlots.map((date, idx) => {
      const isReseved = bookedSlots.includes(date.getTime().toString())
        ? "isReserved"
        : "";

      return availableSlotItems.push(
        <span
          className={`timeslot-item ${isReseved}`}
          key={idx}
          onClick={() => handleTimeslotClick(date, isReseved)}
        >
          {format(date, "HH:mm", { locale: enUS })}
        </span>
      );
    });
    setAvailableSlotItems(availableSlotItems);
  }, [bookedSlots]);

  const handleTimeslotClick = (date, isReseved) => {
    if (isReseved) return;
    if (typeof props.onTimeslotClick === "function") {
      props.onTimeslotClick(date);
    }
  };

  return (
    <div className="calendarComponent-timeslots calendar-flex-item">
      <div className="timeslot-container">
        {isLoading ? <Loading /> : availableSlotItems}
      </div>
    </div>
  );
}
