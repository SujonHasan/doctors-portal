import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/UserContext';
import { toast } from 'react-hot-toast';
import useToken from '../../hooks/useToken';

const SignUp = () => {

    const { CreateUser, updateUser, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [signUpError, setSignUpError] = useState('');
    const [createdUserEmail, setCreatedUserEmail] = useState('')
    const [token] = useToken(createdUserEmail);

    if (token) {

        navigate('/');
    }

    const handleSignup = (data) => {
        // console.log(data);
        setSignUpError('');
        CreateUser(data.email, data.password)
            .then(result => {
                toast.success('SignUp successfully');
                console.log(result.user);
                const upUser = {
                    displayName: data.name
                }
                updateUser(upUser)
                    .then(() => {
                        console.log("update :", result.user);
                        saveUser(data.name, data.email)
                    })
                    .catch(error => {
                        console.log(error.message);
                        setSignUpError(error.message);
                    })
            })
            .catch(error => {
                console.log(error.message);
                setSignUpError(error.message);

            })
    }

    const saveUser = (name, email) => {

        const user = { name, email };
        fetch('https://doctors-portal-server-sujonhasan.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(req => req.json())
            .then(data => {
                setCreatedUserEmail(email);
            })

    }

    const handleGoogleLogin = () => {

        googleSignIn()
            .then(result => {
                console.log(result.user);
                navigate('/');
            })
            .catch(error => {
                console.log(error.message);
                setSignUpError(error.message);
            })
    }

    return (
        <div className='h-[480] my-10 flex justify-center items-center'>
            <div className='w-96'>
                <h1 className='text-4xl' >Sign Up</h1>
                <form onSubmit={handleSubmit(handleSignup)}>

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
                        <label className="label"><span className="label-text text-2xl">Password</span></label>
                        <input type='password' {...register('password', {
                            required: "Password must be required",
                            minLength: { value: 6, message: "must be 6 character", },
                            pattern: { value: /(?=.*[A-Z])(?=.*[0-9])(?=.*[!@$&*])/, message: "Password must be Upper Character Number and special character" },
                        })} className="input input-bordered w-full " />
                        {errors.password && <p className='text-red-600' >{errors.password.message}</p>}
                    </div>

                    <input className="input input-bordered w-full btn-accent " type="submit" value="Sign Up" />

                    <div>
                        {
                            signUpError && <p className='text-red-600'> {signUpError} </p>
                        }
                    </div>

                </form>

                <p className='my-2'>Already Have an account <Link to='/login' className='text-secondary' >Please Login</Link>  </p>
                <div className='divider' >OR</div>
                <input onClick={handleGoogleLogin} className='btn w-full' value='CONTINUE WITH GOOGLE' ></input>

            </div>
        </div>
    );
};

export default SignUp;