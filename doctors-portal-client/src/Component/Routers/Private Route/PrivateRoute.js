import React, { useContext } from 'react';
import { AuthContext } from '../../Context/UserContext';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {

    const {user, loadding} = useContext(AuthContext);
    const location = useLocation();

    if(loadding) return <div><span className="loading loading-dots loading-lg"></span></div>

    if(user && user.uid) return children;

    return <Navigate to='/login' state={{from: location}} replace ></Navigate>
};

export default PrivateRoute;