import React from 'react';

const Testimonial = ({testimonial}) => {

    const {name, location, comment, image} = testimonial;
    return (
        <div className='md:p-5'>

            <div>
                {comment}
            </div>
            <div className='flex py-5'>
                <img src={image} alt="" />
                <div className='p-5'>
                    <h1>{name}</h1>
                    <p>{location}</p>
                </div>
            </div>
            
        </div>
    );
};

export default Testimonial;