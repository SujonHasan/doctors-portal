import React, { useState } from 'react';
import { bg, chair } from '../../../assets/assets';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';

const AppoinmentBanner = ({selectedDate, setselectedDate}) => {

    return (
        <div className="hero lg:p-32"
        style={{backgroundImage: `url(${bg})`}}
        >
            <div className="hero-content flex-col lg:gap-20 lg:flex-row-reverse">
                <img src={chair} alt='Chair' className="max-w-sm rounded-lg shadow-2xl" />
                <div className=''>
                    <DayPicker
                    mode='single'
                    selected={selectedDate}
                    onSelect={setselectedDate}
                    ></DayPicker>
                </div>
            </div>
        </div>
    );
};

export default AppoinmentBanner;