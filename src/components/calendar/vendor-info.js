export default function VendorInfo(props) {
    const vendorName = props.name;
    const selectedDay = props.selectedDay;

    return (
        <div className="calendarComponent-vendor calendar-flex-item" >
            <div className="vendor-info-container">
                <div className="vendor-name-container">
                    Vendor Name:<p><b>{vendorName}</b></p>
                </div>
                {!selectedDay && <p>Please select a day</p>}
            </div>
        </div>
    )
}