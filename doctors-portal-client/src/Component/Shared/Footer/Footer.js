import React from 'react';
import {footer } from '../../../assets/assets';
import {Link} from 'react-router-dom'

const Footer = () => {
    return (
        <div>
            <footer className="footer py-10 md:px-32 px-16 justify-between "
                style={{
                    backgroundImage: `url(${footer})`,
                }}>
                <div>
                    <span className="footer-title">Services</span>
                    <Link to="">Emergency Checkup</Link>
                    <Link to="">Monthly Checkup</Link>
                    <Link to="">Weekly Checkup</Link>
                    <Link to="">Deep Checkup</Link>
                </div>
                <div>
                    <span className="footer-title">ORAL HEALTH</span>
                    <Link to="">Fluoride Treatment</Link>
                    <Link to="">Cavity Filling</Link>
                    <Link to="">Teath Whitening</Link>
                </div>
                <div>
                    <span className="footer-title">Our Address</span>
                    <p>Uttar badda, Dhaka, Bangladesh</p>
                </div>
            </footer>
            <div className='my-10'>Copyrihgt <span>&copy;</span> <span className='font-bold' >Sujon</span> 2023 All RIght Reserved</div>
        </div>

    );
};

export default Footer;