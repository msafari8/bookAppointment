import { isValidDate } from '../../helpers/validation'
import { AVAILABLE_DATE_OBJECT_KEYNAME } from './constants'
import { isSameDay } from 'date-fns'

  /*
  * ----------------------
  * check if vendor is available
  * on specific day
  * returns boolean
  * ----------------------
  */

  export function isVendorAvailableByDay(calendarDay,availabilities) {

    const vendorIsAvailable = availabilities.some(item_date => isSameDay(item_date, calendarDay));
  
    return vendorIsAvailable;
  }

  /*
  * ----------------------
  * Find TimeSlots by Day
  * returns an array of dates
  * ----------------------
  */
  
  export function findVendorAvailabliesByDay(selectedDate,availabileDates){
  
   const timeSlotsByDay= availabileDates.filter(item_date => isSameDay(item_date, selectedDate));
    return timeSlotsByDay;
  }

  /*
  * ----------------------
  * Convert to DateTime
  * and remove invalid dates
  * returns a new array
  * ----------------------
  */
  export  function formatAvailabilityDate(newArray, date) {
    const newDate = new Date(date[AVAILABLE_DATE_OBJECT_KEYNAME]);
  
    if (isValidDate(newDate)) {
      newArray.push(newDate); // we only need the valid Dates
    }
    return newArray;
  }
  
  /*
  * ----------------------
  * sort in ascending order
  * ----------------------
  */
  export function sortAvailabilitiesAscending(a, b) {
    return a - b;
  }

  /*
  * ----------------------
  * Sort by Ascending and Format Availabilities
  * and remove invalid dates
  * ----------------------
  */
  export function sortAndFormatAvailabilities(dates) {
    return dates
      .reduce(formatAvailabilityDate, [])
      .sort(sortAvailabilitiesAscending)
  
  }
  