import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'


export default function VendorTimeSlots(props) {
    const availableSlots = props.availableSlots;
    // const selectedDay = props.selectedDay;
    const bookedSlots = props.bookedSlots;

    const handleTimeslotClick = (date,isReseved) => {
        if(isReseved) return;
        props.onTimeslotClick(date);
    }


    let availableSlotItems = [];
    availableSlots.map((date, idx) => {

        const isReseved = bookedSlots.includes(date.getTime().toString()) ? 'isReserved' : '';

        return availableSlotItems.push(
            <span className={`timeslot-item ${isReseved}`} key={idx} onClick={() => handleTimeslotClick(date,isReseved)}>{format(date, 'HH:mm', { locale: enUS })}</span>
        );
    });

    return (
        <div className="calendarComponent-timeslots calendar-flex-item" >
            <div className="timeslot-container">
                {availableSlotItems}

            </div>
        </div>
    )
}