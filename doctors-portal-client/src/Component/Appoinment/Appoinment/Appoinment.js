import React, { useState } from 'react';
import AppoinmentBanner from '../AppoinmentBanner/AppoinmentBanner';
import AvaliableAppoinment from '../AvaliableAppoinment/AvaliableAppoinment';

const Appoinment = () => {
    const [selectedDate, setselectedDate] = useState(new Date());

    return (
        <div>

            <AppoinmentBanner
                selectedDate={selectedDate}
                setselectedDate={setselectedDate}
            ></AppoinmentBanner>

            <AvaliableAppoinment
                selectedDate={selectedDate}
            ></AvaliableAppoinment>

        </div>
    );
};

export default Appoinment;