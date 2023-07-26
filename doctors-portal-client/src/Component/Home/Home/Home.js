import React from 'react';
import Banner from '../Banner/Banner';
import Infocards from '../InfoCards/Infocards';
import Services from '../Services/Services';
import Exceptional from '../Exceptional/Exceptional';
import HomeAppoinment from '../HomeAppoinment/HomeAppoinment';
import Testimonials from '../Testimonial/Testimonials';
import ContactUs from '../ContactUs/ContactUs';

const Home = () => {
    return (
        <div className='mx-5'>
            <Banner></Banner>
            <Infocards></Infocards>
            <Services></Services>
            <Exceptional></Exceptional>
            <HomeAppoinment></HomeAppoinment>
            <Testimonials></Testimonials>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;