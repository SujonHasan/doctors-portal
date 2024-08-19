import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

const CheckOutForm = ({ booking }) => {

    const { _id, price, patient, email } = booking;

    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [success, Setsuccess] = useState('');
    const [processing, Setprocessing] = useState(false);
    const [transactionId, SettransactionId] = useState('');


    // payment client side method
    // https://stripe.com/docs/payments/quickstart?client=react&lang=node
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://doctors-portal-server-sujonhasan.vercel.app/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => {
                setClientSecret(data.clientSecret);
                console.log("ClientSecret = ", clientSecret);
            });
    }, [price]);


    const handleSubmit = async (event) => {

        event.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);

        if (card == null) return;

        const { error, paymentMethod } = await stripe.createPaymentMethod({

            type: 'card',
            card
        })

        if (error) {

            console.log('paymentmethd error ', error);
            setCardError(error.message);
        }
        else {
            setCardError('');
            console.log('paymentmethod = ', paymentMethod);
        }

        Setsuccess('');
        Setprocessing(true);

        // confirm card payment //   https://stripe.com/docs/js/payment_intents/confirm_card_payment

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: patient,
                        email: email
                    },
                },
            },
        );

        if (confirmError) {
            setCardError(confirmError.message);
            return;
        }

        if (paymentIntent.status === "succeeded") {


            console.log('card info ', card);
            // payment info in database

            const payment = {

                price,
                transactionId: paymentIntent.id,
                email,
                bookingId: _id
            }

            fetch('https://doctors-portal-server-sujonhasan.vercel.app/payments', {

                method: 'POST',
                headers: {

                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);

                    if (data.insertedId) {

                        Setsuccess('Congratulation Your pay completed');
                        SettransactionId(paymentIntent.id);

                    }
                })
        }

        Setprocessing(false);



    }
    return (
        <>

            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button
                    className='btn btn-primary my-5'
                    type="submit"
                    disabled={!stripe || !setClientSecret || processing}>
                    Pay
                </button>
            </form>

            {/* {
                cardError && <p className='text-red-500' >{cardError}</p>
            } */}

            <p className='text-red-500' >{cardError}</p>

            {
                success && <div>

                    <p className='text-green-500' >{success}</p>
                    <p> Your transactionId: <span className='font-bold' >{transactionId}</span>  </p>
                </div>
            }

        </>
    );
};

export default CheckOutForm;