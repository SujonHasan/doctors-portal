import React, { useContext } from 'react';
import Navbar from '../Shared/Navbar/Navbar';
import { Link, Outlet } from 'react-router-dom';
import useAdmin from '../../hooks/useAdmin';
import { AuthContext } from '../Context/UserContext';

const DashboardLayout = () => {

    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);

    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer lg:drawer-open">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                        <li><Link to='/dashboard' >My Appoinments</Link></li>
                        {
                            isAdmin && <>
                                <li><Link to='/dashboard/allusers' >All Users</Link></li>
                                <li><Link to='/dashboard/adddoctor' >Add A Doctor</Link></li>
                                <li><Link to='/dashboard/managedoctors' >Manage Doctors</Link></li>
                            </>
                        }

                        {/* <li><Link to='/dashboard/allusers' >All Users</Link></li> */}
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;