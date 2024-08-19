import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../../Home/Home/Home';
import Main from '../../Layout/Main';
import Login from '../../Login/Login';
import Appoinment from '../../Appoinment/Appoinment/Appoinment';
import SignUp from '../../SignUp/SignUp';
import Dashboard from '../../../Dashboard/Dashboard/Dashboard';
import PrivateRoute from '../Private Route/PrivateRoute';
import DashboardLayout from '../../Layout/DashboardLayout';
import AllUsers from '../../../Dashboard/AllUsers/AllUsers';
import AdminRouter from '../AdminRouter/AdminRouter';
import AddDoctor from '../../../Dashboard/AddDoctor/AddDoctor';
import ManageDoctors from '../../../Dashboard/ManageDoctors/ManageDoctors';
import Payment from '../../../Dashboard/Payment/Payment';
import DisplayError from '../../Shared/DisplayError/DisplayError';

const Router = createBrowserRouter([

    {
        path: '/',
        element: <Main></Main>,
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: 'signup',
                element: <SignUp></SignUp>

            },
            {
                path: '/appoinment',
                element: <PrivateRoute> <Appoinment></Appoinment> </PrivateRoute>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute> <DashboardLayout></DashboardLayout> </PrivateRoute>,
        errorElement: <DisplayError> </DisplayError>,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard></Dashboard>
            },
            {
                path: '/dashboard/allusers',
                element: <AdminRouter> <AllUsers></AllUsers> </AdminRouter>
            }
            ,
            {
                path: '/dashboard/adddoctor',
                element: <AdminRouter> <AddDoctor></AddDoctor> </AdminRouter>
            },
            {
                path: '/dashboard/managedoctors',
                element: <AdminRouter> <ManageDoctors></ManageDoctors> </AdminRouter>
            },
            {
                path: '/dashboard/payment/:id',
                element: <Payment></Payment>,
                loader: ({ params }) => fetch(`https://doctors-portal-server-sujonhasan.vercel.app/bookings/${params.id}`)
            }
        ]
    }

])

export default Router;