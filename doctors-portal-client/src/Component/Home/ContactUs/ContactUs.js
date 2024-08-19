import React from 'react';
import { appoinment } from '../../../assets/assets';
import PrimaryButton from '../../../tools/PrimaryButton/PrimaryButton';

const ContactUs = () => {
    return (
        <div className='py-16'
            style={{ backgroundImage: `url(${appoinment})` }}
        >
            <div className='pb-5'>
                <h1 className='text-secondary' >Contact Us</h1>
                <h1 className='text-4xl text-white' >Stay connected with us</h1>
            </div>
            <div className='mb-10'>
                <input type="email" name='email' placeholder="Email Address" className="input input-bordered w-full max-w-[500px]" /> <br></br>
                <input type="text" placeholder="Subject" className="input my-5 input-bordered w-full max-w-[500px]" /> <br></br>
                <textarea className="textarea" placeholder="Your message" className = "textarea textarea-bordered textarea-lg w-full max-w-[500px]"></textarea>
                <br></br>
                
            </div>
            <PrimaryButton>Submit</PrimaryButton>
        </div>
    );
};

export default ContactUs;