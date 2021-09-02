import { enUS } from 'date-fns/locale'
import { DatePickerCalendar } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'

import { isVendorAvailableByDay } from './logic'
import { Loading } from '../../helpers/common';


export default function VendorCalendar(props) {


    const availabilities = props.availabilities;

    const modifiers = {
        disabled: date => !isVendorAvailableByDay(date, availabilities) //disable Not Available Day
    }


    const handleDayClick = date => {
        props.onDateChange(date);
    }

    return (
        <div className="calendarComponent-container calendar-flex-item">
            <div className="nice-calendar-container">
                {!availabilities.length &&
                    <Loading />
                }
                <DatePickerCalendar date={props.selectedDay} minimumDate={new Date()} modifiers={modifiers} locale={enUS} onDateChange={handleDayClick} />
            </div>
        </div>

    )
}


