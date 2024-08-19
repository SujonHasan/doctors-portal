import React from 'react';
import PrimaryButton from '../../../tools/PrimaryButton/PrimaryButton';

const AppoinmentOption = ({ option, setTreatment }) => {

    const { name, slots, price } = option;
    return (
        <div className="card  shadow-xl">
            <div className="card-body ">
                <h2 className=" text-4xl font-bold text-center">{name}</h2>
                <p> {slots.length > 0 ? slots[0] : 'Try another day'}  </p>
                <p> {slots.length} {slots.length > 1 ? 'spaces' : 'space'}  Availabe </p>
                <p><small>{`Price: ${price}`}</small></p>
                <label htmlFor="booking_model"
                 disabled = {slots.length === 0}
                 onClick={()=> setTreatment(option)} 
                 className="btn btn-primary">Booking Appointment</label>
            </div>
        </div>
    );
};

export default AppoinmentOption;