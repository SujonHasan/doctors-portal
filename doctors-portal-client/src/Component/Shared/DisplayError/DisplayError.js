import React from 'react';
import { useRouteError } from 'react-router-dom';
import { AuthContext } from '../../Context/UserContext';

const DisplayError = () => {

    const error = useRouteError();
    const { user, logOut } = useContext(AuthContext);


    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate('/login');
            })
            .catch(error => {
                console.log(error.messege);
            })
    }

    return (
        <div>

            <p className='text-red-500' >Something went wrong</p>
            <p className='text-red-500' > {error.statusText || error.message} </p>
            <p className='text-red-500' >Please <button className='mt-2' onClick={handleLogOut} >Sign Out</button> and log back in </p>
            
        </div>
    );
};

export default DisplayError;