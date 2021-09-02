import { format } from 'date-fns'
import { dbStore } from './api-client';
import { vendorData } from './data';

/**
 * get booked slots by DAY and vendor name, used for time slots
 */
export async function getBookingsByVendorNameDate(vendorName,time) {
   const bookingDay= format(time, 'yyyy-MM-dd');
    time = time.toISOString();
    try {
        let { data, error, status } = await dbStore
            .from('bookings')
            .select('booking_date')
            .eq('vendor_name', vendorName)
            .filter('booking_day','eq', bookingDay)

        if (error && status !== 406) {
            throw error;
        }
        
        return { success: true, data };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

/*
* checks whether vendor is booked for a specific date
* works for validation
* this can be replaced in backend side but since we dont have
* access to backend and we are restricted by db, 
* we can only do this on frontend
*/
export async function isVendorBooked(vendorName, time) {
    time = time.toISOString();
    try {
        let { data, error, status } = await dbStore
            .from('bookings')
            .select('booking_date')
            .eq('vendor_name', vendorName)
            .eq('booking_date', time);

        if (error && status !== 406) {
            throw error;
        }

        return { success: true, data };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

/*
* this can be easily replaced by an axios call 
* to a json backend to get the data, for the 
* purpose of this demo, we have the data in a static file
*/
export async function getVendorAvailabilities() {
    return { success: true, data: vendorData };
}

/*
* it saves the new booked appointment in db, 
* before we save we convert to getTime for easier calculations
* the "supabase" database has restrictions,hence the compromise
*/
export async function insertBookingByVendorName(vendorName, message, booking_time) {
    booking_time = booking_time.getTime();
  
    const booking_day=format(booking_time, 'yyyy-MM-dd');//todo: do the calculation in backend, this is a frontend fix
    try {

        let { newBooking, error, status } = await dbStore
            .from('bookings')
            .upsert({ vendor_name: vendorName, message: message, booking_date: booking_time,booking_day }, { ignoreDuplicates: true })
            .single();

        if (error && status !== 406) {
            throw error;
        }
        return { success: true, data: newBooking };
    } catch (error) {
        return { success: false, message: error.message };
    }

}