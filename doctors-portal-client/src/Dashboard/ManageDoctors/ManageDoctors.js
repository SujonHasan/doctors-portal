import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import ConfirmaionModal from '../../Component/Shared/ConfirmationModal/ConfirmaionModal';
import { toast } from 'react-hot-toast';

const ManageDoctors = () => {

    const [deleteDoctors, setDeleteDoctors] = useState(null);

    const { data: doctors = [], isLoading, refetch } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            try {

                const res = await fetch(`https://doctors-portal-server-sujonhasan.vercel.app/doctors`, {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json();
                console.log('all manageDoctor ', data);
                return data;

            } catch (error) {

            }
        }
    })

    const closeModal = () => {
        setDeleteDoctors(null);
    }

    const handleDeleteDoctor = (doctor) => {

        fetch(`https://doctors-portal-server-sujonhasan.vercel.app/doctors/${doctor._id}`, {

            method: 'DELETE',
            headers: {

                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    refetch();
                    toast.success(`Doctor ${doctor.name} deleted successfully`)
                }

            })
    }

    return (
        <div>
            <h1 className='text-4xl font-bold'> {`Manage Doctors ${doctors.length}`} </h1>

            <div className="w-full h-full">
                <table className="table">
                    <thead>
                        <tr className="bg-base-200 ">
                            <th></th>
                            <th>AVATAR</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>SPECILITY</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctors &&
                            doctors?.map((doctor, index) => <tr key={index}>
                                <th>{index + 1}</th>
                                <td> <div className="avatar">
                                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src={doctor.imageUrl} alt='doctorImage' />
                                    </div>
                                </div> </td>
                                <td>{doctor.name}</td>
                                <td>{doctor.email}</td>
                                <td>{doctor.specility}</td>
                                <td> <label onClick={() => setDeleteDoctors(doctor)} htmlFor="confirmationModal" className="btn btn-xs btn-error">Delete</label> </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>

            {
                deleteDoctors && <ConfirmaionModal
                    title={'Are you sure want to delete?'}
                    message={`if you delete ${deleteDoctors.name} . It cannot be unmode`}
                    successAction={handleDeleteDoctor}
                    modalData={deleteDoctors}
                    closeModal={closeModal}
                ></ConfirmaionModal>
            }

        </div>
    );
};

export default ManageDoctors;