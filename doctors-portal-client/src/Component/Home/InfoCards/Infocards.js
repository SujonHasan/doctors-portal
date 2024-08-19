import React from 'react';
import { chair, clock, marker, phone } from '../../../assets/assets';
import Infocard from './Infocard';


const Infocards = () => {
    
    const cardData = [

        {
            id: '1',
            name: "Opening Hours",
            description: "Everyday 10AM to 10 PM.",
            icon: clock,
            bgCard: 'bg-primary from-primary to-secondary',
        },
        {
            id: '2',
            name: "Visit Our Location",
            description: "Uttar Badda, Dhaka- Bangladesh",
            icon: marker,
            bgCard: 'bg-accent',
        },
        {
            id: '3',
            name: "Contact us Now",
            description: "+8801711223344",
            icon: phone,
            bgCard: 'bg-primary from-secondary to-primary',
        }
    ]
    return (
        <div className= "grid lg:mt-40 mt-10 gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {
                cardData.map(card => <Infocard
                    key={card.id}
                    card = {card}
                ></Infocard>)
            }
            
        </div>
    );
};

export default Infocards;