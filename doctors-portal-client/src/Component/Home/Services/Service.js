import React from 'react';

const Service = ({service}) => {

    const {name, description, icon} = service;

    return (
        <div className='p-10 gap-y-5 m-auto'>
            <div> <img className='m-auto' src={icon} alt="" /> </div>
            <div className='my-5 font-bold text-2xl'> {name} </div>
            <div className='text-start font-semibold'> {description} </div>
            
        </div>
    );
};

export default Service;