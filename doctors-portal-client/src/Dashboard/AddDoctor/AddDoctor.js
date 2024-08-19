import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddDoctor = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();

    const imgHostKey = process.env.REACT_APP_imgbb_key;

    const navigate = useNavigate();

    const { data: appoinmentSpecilitys = [] } = useQuery({
        queryKey: ['appoinmentSpecility'],
        queryFn: async () => {
            const res = await fetch(`https://doctors-portal-server-sujonhasan.vercel.app/appoinmentSpecility`);
            const data = await res.json();
            return data;
        }
    })

    const handleAddDoctor = (data) => {

        const image = data.image[0];
        // console.log(image);
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`;

        fetch(url, {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(imgData => {

                // console.log(imgData.data.url);

                const doctor = {

                    name: data.name,
                    email: data.email,
                    specility: data.specility,
                    imageUrl: imgData.data.url
                }

                // console.log(doctor);

                // save doctor information to the database

                fetch('https://doctors-portal-server-sujonhasan.vercel.app/doctors', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(doctor)
                })
                    .then(res => res.json())
                    .then(result => {
                        if (result.acknowledged) {

                            toast.success(`${data.name} is added successfully`);
                            navigate('/dashboard/managedoctors');
                        }
                    })

            })

    }
    return (
        <div className='w-96 m-auto justify-center items-center'>
            <h1 className='text-4xl font-bold mb-5' >Add A Doctor</h1>

            <form onSubmit={handleSubmit(handleAddDoctor)}>

                <div className="form-control w-full">
                    <label className="label"><span className="label-text text-2xl">Name</span></label>
                    <input type='text' {...register('name', { required: 'Name is required' })} className="input input-bordered w-full" />
                    {errors.name && <p className='text-red-600' >{errors.name.message}</p>}
                </div>

                <div className="form-control w-full">
                    <label className="label"><span className="label-text text-2xl">Email</span></label>
                    <input type='email' {...register('email', { required: 'Email must be required', maxLength: { value: 30, message: 'Lessthen 30 character' } })} className="input input-bordered w-full" />
                    {errors.email && <p className='text-red-600' >{errors.email.message}</p>}
                </div>

                <div className="form-control w-full ">
                    <label className="label"><span className="label-text text-2xl">Specility</span></label>
                    <select {...register('specility', { required: 'specility is required' })} className="select w-full max-w-xs input-bordered">
                        <option disabled selected>Pick a Specility</option>
                        {
                            appoinmentSpecilitys?.map(appspt => <option key={appspt._id} value={appspt.name} > {appspt.name} </option>)
                        }
                    </select>
                </div>

                <div className="form-control w-full">
                    <label className="label"><span className="label-text text-2xl">Photo</span></label>
                    <input type='file' {...register('image', { required: 'photo is required' })} className="input input-bordered w-full" />
                    {errors.image && <p className='text-red-600' >{errors.image.message}</p>}
                </div>

                <input className="input input-bordered w-full btn-accent " type="submit" value="ADD DOCTOR" />

            </form>
        </div>
    );
};

export default AddDoctor;

/***
 * Three places to store images
 * 1. Third party image hosting server
 * 2. File system of your server
 * 3. mongodb (database)
 */