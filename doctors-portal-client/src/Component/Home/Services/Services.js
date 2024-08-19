import React from 'react';
import { cavity, fluoride, whitening } from '../../../assets/assets';
import Service from './Service';



const Services = () => {

    const servicesData = [

        {
            id: '1',
            name: "Fluoride Treatment",
            description: "Fluoride treatments are typically professional treatments containing a high concentration of fluoride that a dentist or hygienist will apply to a person's teeth to improve health and reduce the risk of cavities",
            icon: fluoride,
        },
        {
            id: '2',
            name: "Cavity Flling",
            description: "A cavity filling is a form of dental filling wherein the dentist removes the decayed segment of the tooth and fills that portion with a material like metal or ceramic,",
            icon: cavity,
        },
        {
            id: '3',
            name: "Teeth Whitening",
            description: "In-office bleaching provides the quickest way to whiten teeth. With in-office bleaching, the whitening product is applied directly to the teeth",
            icon: whitening,
        },
    ]

    return (
        <div className='mt-16'>
            <div>
                <h1 className='text-2xl text-secondary'>OUR SERVICES</h1>
                <h1 className='text-4xl'>Services We Provide</h1>
            </div>

            <div className='grid mt-10 gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    servicesData.map(service => <Service
                        key={service.id}
                        service={service}
                    ></Service>)
                }

            </div>
        </div>
    );
};

export default Services;