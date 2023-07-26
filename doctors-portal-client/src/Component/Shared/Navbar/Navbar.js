import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/UserContext';
import DarkMode from '../../../tools/DarkMode/DarkMode';

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext);
    const [theme, setTheme] = useState('light');

    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate('/login');
            })
            .catch(error => {
                console.log(error.messege);
            })
    }

    // const handleCheckBox = (e) =>{
    //     console.log(e.target.checked);
    // }
    // useEffect(() =>{
    //     document.body.className = theme;
    // },[theme])


    const manuItems = <>
        <li><Link to="/" >Home</Link></li>
        <li><Link>About</Link></li>
        <li><Link to="/appoinment" >Appoinment</Link></li>
        <li><Link >Contact Us</Link></li>
        {user?.uid ?
            <>
                <li><Link to="/dashboard" >DashBoard</Link></li>
                <p className='p-2'> {user.displayName} </p>
                <li><button className='mt-2' onClick={handleLogOut} >Sign Out</button></li>
            </>
            :
            <li><Link to="/login" >Login</Link></li>
        }
        {/* <li>
            <div className="form-control py-0">
                <label className="label cursor-pointer">
                    <input onClick={handleCheckBox} type="checkbox" className="toggle"/>
                </label>
            </div>
        </li> */}
    </>
    return (
        <div className="navbar bg-base-100 flex justify-between font-bold">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={1} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {manuItems}
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl">Doctors Portal</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {manuItems}
                </ul>
            </div>
            
            <div>
                <DarkMode></DarkMode>
            </div>

            <label htmlFor="dashboard-drawer" tabIndex={3} className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
        </div>
    );
};

export default Navbar;