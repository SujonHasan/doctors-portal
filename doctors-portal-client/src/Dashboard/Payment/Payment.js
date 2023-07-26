import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import CheckOutForm from './CheckOutForm';
import Loading from '../../Component/Shared/Loading/Loading';


//payment method  https://stripe.com/docs/stripe-js/react

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

// console.log('stripe Promise = ', stripePromise);

const Payment = () => {

    const booking = useLoaderData();
    const { treatment, price, AppoinmentDate, slot } = booking;

    const navigation = useNavigation();
    
    if (navigation.state === 'loading') {
        return <Loading></Loading>
    }

    return (
        <div className='w-full text-center'>
            <div className=''>
                <h1 className='text-4xl' >Payment For {treatment}</h1>
                <p>Please pay $ <strong> {price} </strong> for your appointment on {AppoinmentDate} at {slot} </p>
            </div>
            <div className='w-96 justify-center items-center text-center ms-52'>
                <Elements stripe={stripePromise}>
                    <CheckOutForm
                    booking ={booking}
                     />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;