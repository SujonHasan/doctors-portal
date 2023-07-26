import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../Component/Shared/Navbar/Navbar';
import { AuthContext } from '../../Component/Context/UserContext';
import { useQuery } from '@tanstack/react-query';
import Bookings from './Bookings';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';

const Dashboard = () => {

    const { user } = useContext(AuthContext);

    const [selectedDate, setselectedDate] = useState(new Date());

    const date = format(selectedDate, 'PP');

    const email = user.email;

    console.log('email, data clind ', email, date);

    const { data: bookings = [] } = useQuery({
        queryKey: ['bookings', email, date],
        queryFn: async () => {
            const res = await fetch(`https://doctors-portal-server-sujonhasan.vercel.app/bookings?email=${email}&AppoinmentDate=${date}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            console.log('booking data ', data);
            return data;
        }
    })

    return (
        <div className='mx-0 w-full'>
            <div className=''>
                <div className=' m-auto p-10 bg-slate-100'>
                    <div className='flex justify-between mb-5'>
                        <h1>My Appoinment</h1>
                        <details className="collapse">
                            <summary className="collapse-title btn ml-auto w-40 bg-slate-600 ">{date}</summary>
                            <div className="collapse-content">
                                <DayPicker
                                    mode='single'
                                    selected={selectedDate}
                                    onSelect={setselectedDate}
                                ></DayPicker>
                            </div>
                        </details>
                    </div>

                    <div className="w-full h-full">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr className="bg-base-200 ">
                                    <th></th>
                                    <th>NAME</th>
                                    <th>TREATMENT</th>
                                    <th>TIME</th>
                                    <th>PAYMENT</th>
                                </tr>
                            </thead>
                            <tbody className='bg-white' >
                                {
                                    bookings &&
                                    bookings?.map((book, index) => <Bookings key={index} book={book} index={index} ></Bookings>)
                                }
                            </tbody>
                        </table>
                    </div>


                </div>

            </div>

        </div>
    );
};

export default Dashboard;