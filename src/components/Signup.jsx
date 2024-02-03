import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { Input, Button, Logo } from './index'
import { useForm } from 'react-hook-form'
import authService from '../appwrite/auth';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast'
import { login } from '../features/authSlice'


function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const signup = async (data) => {
        setError("");
        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const userData = await authService.getCurrentUser();
                if (userData)
                    dispatch(login(userData));
                toast.promise("Registered-successfully")
                navigate('/')
            }
        } catch (error) {
            setError(error.message);
            toast.error("Failed to register")
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
                <h2 className="text-center text-2xl font-bold leading-tight">Sign-up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to={'/login'}
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Log-In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-2 text-center">{error}</p>}

                <form onSubmit={handleSubmit(signup)}>
                    <div className='space-y-5 mt-6'>
                        <Input
                            label="Full Name: "
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: true,
                            })}
                        />
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password (min-8 char)"
                            {...register("password", {
                                required: true,
                                minLength:3
                            })}
                        />
                        <Button type="submit" className="w-full">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Signup