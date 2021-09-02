import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'
import React, { useState } from 'react';
import { insertBookingByVendorName } from './api-calls';
import { Loading } from '../../helpers/common';

export default function VendorBooking(props) {
    const [messageText, setMessageText] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [bookingIsDone, setBookingIsDone] = useState(false);

    const vendorName = props.name;
    const selectedDay = props.selectedDay;
    const selectedTimeslot = props.selectedTimeslot;

    const handleMessageChange = (e) => {
        const textAreaValue = e.target.value;
        setMessageText(textAreaValue);
    }
    const handleReset = () => {
        props.onReset();
    }
    const handleBookAppointment = () => {
        if (!messageText.length) {
            setErrorMessage("* Reason can not be empty!")
            return;
        }
        setIsLoading(true);
        insertBookingByVendorName(vendorName, messageText, selectedTimeslot).then((response) => {
            if (response.success) {
                setIsLoading(false);
                setBookingIsDone(true);
                props.onBookingDone();
            } else if (!response.success && response.message.includes("duplicate")) {
                setIsLoading(false);
                setErrorMessage("This Slot is booked, Please Choose another Slot!");
            } else {
                setIsLoading(false);
                setErrorMessage("An unexpected error happened, administrator is notified!");
            }

        });
    }
    let displaySuccessDiv = "none";
    let displayBookingDiv = "block";
    if (bookingIsDone) {
        displaySuccessDiv = "block";
        displayBookingDiv = "none";
    }



    return (
        <div className="calendarComponent-vendor-booking calendar-flex-item" >
            <div className="vendor-booking-container">
                {isLoading &&
                    <Loading />
                }
                {bookingIsDone &&
                    <div className="success-message" style={{ display: displaySuccessDiv }}>
                        Thank you for booking with "<b>{vendorName}</b>".<br />
                        A representative will contact you soon.<br/>
                        <span className="btn book-appointment" onClick={handleReset}>Book another Appointment</span>
                    </div>
                }
            <div className="booking-form" style={{ display: displayBookingDiv }}>


                <div className="vendor-name-container">
                    Book an Appointment:<p><b>{vendorName}</b></p>
                </div>
                {(selectedTimeslot && selectedDay) && <p>Date: {format(selectedDay, 'dd MMM yyyy', { locale: enUS })} at: {format(selectedTimeslot, 'HH:mm', { locale: enUS })}</p>}
                <div className="message-form-container">
                    <form >

                        <textarea rows="8" cols="50" placeholder="Please write a reason..." value={messageText} onChange={handleMessageChange} />
                        {errorMessage &&
                            <div className="required-field">{errorMessage}</div>
                        }
                        <span className="btn book-appointment" onClick={handleBookAppointment}>Book Appointment</span>
                    </form>
                </div>
            </div>

        </div>
        </div >
    )
}