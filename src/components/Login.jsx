import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login as authLogin } from '../features/authSlice';
import { Button, Logo, Input as InputComponent } from './index'
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    // Handle submit is a predefined method which takes your method
    const [error, setError] = useState("");

    //My function to handle form submit
    const login = async (data) => {
        setError("");
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData)
                    dispatch(authLogin(userData))
                toast.success("Logged in successfully")
                navigate('/')
            }
        } catch (error) {
            setError(error.message);
            toast.error("Failed to login")
        }
    }

    return (
        <div className="flex items-center mx-4 justify-center w-full">
            <div className={`flex flex-col w-full max-w-lg bg-gray-100 rounded-xl p-5 border border-black/20`}>
                <div className="mb-2 flex justify-center">
                    {/* <span className="inline-block w-full max-w-[100px]"> */}
                    <Logo width="150px" />
                    {/* </span> */}
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">
                    Log-in to your account
                </h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have an account?&nbsp;
                    <Link
                        to={'/signup'}
                        className='font-medium text-primary transition-all
                    duration-200 hover:underline'>Signup
                    </Link>
                </p>
                {error &&
                    <p className="text-red-600 mt-2 text-center">{error}</p>
                }
                <form onSubmit={handleSubmit(login)}>
                    <div className="space-y-5 mt-6">
                        <InputComponent
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            //Everytime use ...register not register
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
                                        .test(value) || "Email address must be a valid address",
                                }
                            })}
                        />

                        <InputComponent
                            label="Password: "
                            type="password"
                            placeholder="Enter your password (Atleast 8 char long)"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button
                            type="submit"
                            className="w-full"
                        >Sign in</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login