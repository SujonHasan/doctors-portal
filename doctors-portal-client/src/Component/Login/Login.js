import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/UserContext';
import useToken from '../../hooks/useToken';

const Login = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const { signUser, googleSignIn, passwordReset } = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');
    const [modalError, setModalError] = useState(null);

    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    if(token) {
        navigate(from, { replace: true });
    }

    const handleLogin = (data) => {
        // console.log(data);
        // console.log(errors.password);
        setLoginError('');
        signUser(data.email, data.password)
            .then(result => {

                console.log(result.user);
                setLoginUserEmail(data.email);
            })
            .catch(error => {
                console.log(error.message);
                setLoginError(error.message)
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

    const forgotPasswordHandle = (event) => {
        setModalError(null);
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        console.log(email);

        passwordReset(email)
            .then(() => { })
            .catch(error => {
                console.log(error.message);
                setModalError(error.message);
            })
    }

    return (
        <div className='h-[480] my-10 flex justify-center items-center'>

            <div className='w-96'>
                <h1 className='text-4xl' >Login</h1>
                <form onSubmit={handleSubmit(handleLogin
                )}>
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text text-2xl">Email</span></label>
                        <input type='email' className="input input-bordered w-full" {...register("email", { required: "Email is required", maxLength: { value: 30, message: "Lessthen 30 character" } })}
                        />
                        {errors.email && <p className='text-red-600' >{errors.email?.message}</p>}
                    </div>

                    <div className="form-control w-full ">
                        <label className="label"><span className="label-text text-2xl">Password</span></label>
                        <input type='password' className="input input-bordered w-full " {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be 6 character" } })}
                        />

                        <label htmlFor="forgotPassword_model" className="label"><span className="label-text">Forgot Password</span></label>

                        {errors.password && <p className='text-red-600' >{errors.password?.message}</p>}
                    </div>
                    <input className="input input-bordered w-full btn-accent " type="submit" value="Login" />

                    <div>
                        {loginError && <p className='text-red-600' >{loginError}</p>}
                    </div>
                </form>

                {/* Forgot password modal */}
                <input type="checkbox" id="forgotPassword_model" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box">
                        <div className="modal-action justify-between mb-2">
                            <h3 className="font-bold text-lg text-start mb-5">Password recovery</h3>
                            <label htmlFor="forgotPassword_model" className="btn">X</label>
                        </div>
                        <form onSubmit={forgotPasswordHandle} className='grid gap-5'>
                            <input type="email" placeholder="Email" name='email' id='email' className="input input-bordered w-full" />
                            <input htmlFor="forgotPassword_model" type="submit" value="Recover" className='bg-[#3A4256] p-2 rounded-md w-full text-white' />
                        </form>

                        <div>
                            {modalError &&
                                <p className='text-red-600' >{modalError}</p>
                            }
                        </div>

                    </div>
                </div>






                <p className='my-2'>New to Doctors Portal? <Link to='/signup' className='text-secondary' >Create new account</Link>  </p>
                <div className='divider' >OR</div>
                <input onClick={handleGoogleLogin} className='btn w-full' value='CONTINUE WITH GOOGLE' ></input>
            </div>
        </div>
    );
};

export default Login;