import React from 'react';
import { appoinment, doctor } from '../../../assets/assets';
import PrimaryButton from '../../../tools/PrimaryButton/PrimaryButton';

const HomeAppoinment = () => {
    return (
        <section>
            <div className="hero" style={{
                backgroundImage: `url(${appoinment})`,
            }}>
                <div className="hero-content text-white flex-col md:flex-row">
                    <div className='' ><img src={doctor} className="hidden lg:block -mt-20 rounded-lg shadow-2xl" /></div>
                    <div className='text-start p-10'>
                        <p className='text-secondary' >Appointment</p>
                        <h1 className="text-5xl font-bold">Make an appoinment Today</h1>
                        <p className="py-6">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum</p>
                        <PrimaryButton> Appoinment Now </PrimaryButton>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default HomeAppoinment;