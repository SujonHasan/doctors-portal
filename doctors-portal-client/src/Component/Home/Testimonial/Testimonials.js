import React from 'react';
import Testimonial from './Testimonial';
import { people1, people2, people3, quote } from '../../../assets/assets';

const Testimonials = () => {

    const testimonialsData = [
        {
            id: '1',
            name: 'Rosie McClean',
            location: "Califoria",
            comment: "The place was clean, well organized and the staff very helpful and friendly numerous things can be done with in there office. I would recommend this office for anyone you is in need of there services.",
            image: people1,
        },
        {
            id: '2',
            name: 'Pete Bodo',
            location: "Uttara",
            comment: "no wait time to speak of, doctor was confident, knowledgeable, explained my situation clearly. He took good care of me and it seems he was successful addressing problem. May take a few weeks to know for usre",
            image: people2,
        },
        {
            id: '3',
            name: 'Liz Ramos',
            location: "Mirpur",
            comment: "I have been a patient of Dr Lowenfelds for over a year now. From the very beginning the attention and compassion in caring for me are excellent. Colorectal issues can be intimidating and sensitive and Dr Lowenfeld and her team have been open and supportive with everything",
            image: people3,
        }
    ]

    return (
        <div className='p-10 my-5 text-start'>

            <div className='flex justify-between'>
                <div>
                    <h1 className='text-secondary' >Testimonial</h1>
                    <h1 className='text-4xl'>What Our Patients Says</h1>
                </div>
                <figure>
                    <img src={quote} className='w-48' alt="" />
                </figure>
            </div>

            <div className='grid md:p-10 py-20 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    testimonialsData.map(testimonial => <Testimonial

                        key={testimonial.id}
                        testimonial={testimonial}
                    ></Testimonial>)
                }
            </div>

        </div>
    );
};

export default Testimonials;