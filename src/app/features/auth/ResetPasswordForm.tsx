import EmailIcon from '@/app/ui/icons/Email.icon';
import PasswordIcon from '@/app/ui/icons/Password.icon';
import apiInstance from '@/services/api';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import React from 'react'
import { useForm, FieldValues } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import Cookies from 'js-cookie'

const schema = z.object({
    email: z.string().email(),
    otp: z.string()
})

type ResetPasswordInput = z.infer<typeof schema>

const ResetPasswordForm = () => {
    const methods = useForm<ResetPasswordInput>({
        resolver: zodResolver(schema),
    });
    const {
        handleSubmit,
        register,
    } = methods;

    const onSubmit = async (data: FieldValues) => {
        toast.loading("Loading...", { id: "loading" })
        const response = await apiInstance.post('/auth/forgot-password/verify/', data);
        
        toast.success(response.data.message)
        toast.remove("loading")
        window.location.replace(`/auth/change-password/${response.data.data.access_token}`)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Email
                </label>
                <div className="relative">
                    <input
                        {...register("email")}
                        type="email"
                        placeholder="Enter your email"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4">
                        <EmailIcon />
                    </span>
                </div>
            </div>

            <div className="mb-6">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                    OTP
                </label>
                <div className="relative">
                    <input
                        {...register("otp")}
                        type="password"
                        placeholder="6+ Characters, 1 Capital letter"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4">
                        <PasswordIcon />
                    </span>
                </div>
            </div>

            <div className="mb-5">
                <button
                    type="submit"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                >
                    Reset Password
                </button>
            </div>

            
        </form>
    )
}

export default ResetPasswordForm