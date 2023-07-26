import React, { useContext, useEffect, useState } from 'react';
import { format } from 'date-fns';
import AppoinmentOption from './AppoinmentOption';
import BookingModal from '../../BookingModal/BookingModal';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Shared/Loading/Loading';


const AvaliableAppoinment = ({ selectedDate }) => {

    const [treatment, setTreatment] = useState(null);
    let date = format(selectedDate, 'PP');

    console.log(date);

    const { data: appoinmentOptions = [], refetch, isLoading } = useQuery({
        queryKey: ['appoinmentOptions', date],
        queryFn: async () => {
            const res = await fetch(`https://doctors-portal-server-sujonhasan.vercel.app/appoinmentOptions?date=${date}`);
            const data = await res.json();
            return data;
        }
    })

    if (isLoading) return <Loading></Loading>

    // const [appoinmentOptions, setAppoinmentOptions] = useState([]);
    // useEffect( ()=>{

    // fetch('https://doctors-portal-server-sujonhasan.vercel.app/appoinmentOptions')
    // .then(res => res.json())
    // .then(data => setAppoinmentOptions(data))

    // } ,[])

    return (
        <section className='my-10'>

            <div>
                <h1 className='text-secondary text-2xl font-bold'>Avaliable Services on {date} </h1>
                <h1 className='text-2xl font-thinf' >Please select a service</h1>
            </div>
            <div className='grid my-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' >
                {
                    appoinmentOptions.map(option => <AppoinmentOption
                        key={option._id}
                        option={option}
                        setTreatment={setTreatment}
                    ></AppoinmentOption>)
                }
            </div>

            {
                treatment &&
                <BookingModal
                    treatment={treatment}
                    setTreatment={setTreatment}
                    currentDate={date}
                    refetch={refetch}
                ></BookingModal>
            }

        </section>
    );
};

export default AvaliableAppoinment;