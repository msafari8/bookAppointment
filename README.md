# Book an appointment

Here is my attempt for this project.
I couldn't do the tests because I exhausted all the time that I had allocated to do this test and I actually spent more time on it than initially planned😣. it took 3days for me, I was working in the evenings after working hours since I have a full time job, and I couldn't afford to spend more time.
# Demo
[here is a quick online demo](https://msafari8.github.io/bookAppointment/), to make it easier for you to test 😉
# How to run

well duhh:

    npm install && npm run start

## Notes

This project was created by react-scripts default project, the important folders to notice:

 - "**helpers**" folder contains 2 functions, I didn't feel comfortable to include these inside the component folder (would feel guilty), therefore I made a common folder for it.
 - the rest of the files are inside "***components/calendar***" folder, which includes 3 components: "left" "middle" "right"
 ![enter image description here](https://i.imgur.com/xJEgCbn.png)

Each are isolated in their own component and only props are passed to them.
they are called inside index.js which includes only js.

I also isolated the main files:
- logic.js: contains logic 
- api-client.js: contains api client for ***supabase***.
- api-calls.js: contains all the api calls
- constants.js and config.js contain what they should (config should be in root folder but for the purpose of this demo its component based)
- data.js is the static database for vendor-availability, the function to call it from backend is already included in the api-calls.js, because of lack of time, I didn't implement it.

## Backend API

the way I would request a backend API would be by creating a **Contract** and asking backend engineer to provide an API as follow: 

### booking an appointment:
we need an Endpoint to insert a booking into database, the following data will be sent:

    {
    vendor_name: string,
    message: string,
    booking_date: date
    }
**Actions:**
we need to make sure there is no other appointment at this date and time for this vendore before inserting, if there is the insertion should fail and return a falsy success message with a errorCode.

the expected **response** will be in the following format:
we have an error code in case the success is **falsy**

    {
    success: boolean,
    errorCode: string
    }

response example:
***success:***
    {
    success: true
    }
    **failed**
    
    {
    success: false,
    errorCode: vendor_appointment_exists
    }

Other endpoints would be for:

 1. get time slots for specific day
 2. receiving the availabilities for vendor based on time range.
	(in the current example we are fetching everything at single request but in production-		mode this is not appropriate.)
