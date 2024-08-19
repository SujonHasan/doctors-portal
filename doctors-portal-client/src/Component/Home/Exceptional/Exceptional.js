import React from 'react';
import { treatment } from '../../../assets/assets';
import PrimaryButton from '../../../tools/PrimaryButton/PrimaryButton';

const Exceptional = () => {
    return (
        <div className="hero md:p-20">
            <div className="hero-content flex-col lg:flex-row">
                <img src={treatment} className="max-w-sm rounded-lg " />
                <div className='text-start lg:p-36'>
                    <h1 className="text-5xl font-bold">Exceptional Dental Care, on Your Terms</h1>
                    <p className="py-6">The most important qualities a good family dentist should have are being knowledgeable, being an expert in their field, and being trustworthy. A dentist should have excellent communication skills and be compassionate. Your family dentist should be local and operate convenient office hours.</p>
                    <PrimaryButton>Get Started</PrimaryButton>
                </div> 
            </div>
        </div>
    );
};

export default Exceptional;