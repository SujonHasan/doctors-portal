import React, { useContext } from 'react';
import { AuthContext } from '../Context/UserContext';
import { toast } from 'react-hot-toast';

const BookingModal = ({ treatment, setTreatment, currentDate, refetch }) => {
    const { name: treatmentName, slots, price } = treatment;

    const { user } = useContext(AuthContext);

    console.log(user);


    const BookingHandle = (event) => {
        event.preventDefault();
        const form = event.target;
        const slot = form.slot.value;
        const name = form.name.value;
        const phone = form.phone.value;
        const email = form.email.value;

        const Booking = {
            AppoinmentDate: currentDate,
            treatment: treatmentName,
            patient: name,
            phone,
            email,
            slot,
            price
        }

        fetch('https://doctors-portal-server-sujonhasan.vercel.app/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Booking)
        })
            .then(res => res.json())
            .then(data => {

                if (data.acknowledged) {
                    console.log(data);
                    toast.success('Booking Successfully');
                    refetch();
                }
                else {
                    toast.error(`${data.message}`)
                }
            })

        console.log(Booking);
        setTreatment(null);
    }
    return (

        <>
            <input type="checkbox" id="booking_model" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <div className="modal-action justify-between mb-2">
                        <h3 className="font-bold text-lg text-start mb-5">{name}</h3>
                        <label htmlFor="booking_model" className="btn">X</label>
                    </div>
                    <form onSubmit={BookingHandle} className='grid gap-5'>
                        {/* <p className="p-2 w-full bg-[#E6E6E6] rounded-md"> {currentDate} </p>
                        <p className="p-2 w-full bg-[#E6E6E6] rounded-md"> {slots[0]} </p> */}
                        <input type="text" disabled value={currentDate} className="input input-bordered w-full" />
                        <select name='slot' className="select select-bordered w-full">
                            {
                                slots.map((slot, id) => <option
                                    key={id}
                                    value={slot}
                                >{slot}</option>)
                            }
                        </select>
                        <input type="text" defaultValue={user?.displayName} disabled placeholder="Enter Your Name" name='name' id='Name' className="input input-bordered w-full" />
                        <input type="email" defaultValue={user?.email} disabled placeholder="Email" name='email' id='email' className="input input-bordered w-full" />
                        <input type="text" placeholder="Phone Number" name='phone' id='Phone' className="input input-bordered w-full" />
                        <input type="submit" value="Submit" className='bg-[#3A4256] p-2 rounded-md w-full text-white' />
                    </form>

                </div>
            </div>
        </>
    );
};

export default BookingModal;