import React from 'react';

const Infocard = ({card}) => {

    const {name, description, icon, bgCard } = card;

    return (
        <div className={`card text-white ${bgCard}`}>
            <div className="md:flex p-7 gap-5">
                <p><img className='m-auto' src={icon} alt="" /></p>
                <div className="md:text-start">
                    <h2 className="text-2xl font-bold">{name}</h2>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
};

export default Infocard;