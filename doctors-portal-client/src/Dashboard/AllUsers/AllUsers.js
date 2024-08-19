import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../Component/Context/UserContext';

const AllUsers = () => {

    const { user } = useContext(AuthContext);

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users', user.email],
        queryFn: async () => {
            const res = await fetch(`https://doctors-portal-server-sujonhasan.vercel.app/users?email=${user.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            console.log('all user data ', data);
            return data;
        }
    })

    const handleMakeAdmin = (id) => {

        fetch(`https://doctors-portal-server-sujonhasan.vercel.app/users/admin/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {

                if (data.modifiedCount > 0) {

                    toast.success('Make admin Successfully');
                    refetch();
                }
            })

    }

    return (
        <div className='mx-0 w-full'>
            <div className=''>

                <div className=' m-auto p-10 bg-slate-100'>
                    <div className='flex justify-between mb-5'>
                        <h1 className='font-bold text-2xl' >All Users {users.length}</h1>
                    </div>

                    <div className="w-full h-full">
                        <table className="table">
                            <thead>
                                <tr className="bg-base-200 ">
                                    <th></th>
                                    <th>NAME</th>
                                    <th>Email</th>
                                    <th>Admin</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users &&
                                    users?.map((user, index) => <tr key={index}>
                                        <th>{index + 1}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td> {user?.role ? user.role : <button onClick={() => handleMakeAdmin(user._id)} className='btn btn-xs btn-primary' >Make Admin</button>} </td>
                                        <td> <button className='btn btn-xs btn-danger' >Delete</button> </td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>

                </div>

            </div>

        </div >
    );
};

export default AllUsers;