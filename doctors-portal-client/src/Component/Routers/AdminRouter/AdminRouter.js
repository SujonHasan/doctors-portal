import React, { useContext } from 'react';
import { AuthContext } from '../../Context/UserContext';
import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../../../hooks/useAdmin';

const AdminRouter = ({children}) => {

    const {user, loadding} = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin(user?.email);

    const location = useLocation();

    if(loadding || isAdminLoading) return <div><span className="loading loading-dots loading-lg"></span></div>

    if(user && isAdmin) return children;

    return <Navigate to='/login' state={{from: location}} replace ></Navigate>
};

export default AdminRouter;