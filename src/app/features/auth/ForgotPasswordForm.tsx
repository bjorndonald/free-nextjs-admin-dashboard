import EmailIcon from '@/app/ui/icons/Email.icon'
import PasswordIcon from '@/app/ui/icons/Password.icon'
import apiInstance from '@/services/api'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import React from 'react'
import { useForm, FieldValues } from 'react-hook-form'
import toast from 'react-hot-toast'
import z from 'zod'
import Cookies from 'js-cookie'

const schema = z.object({
    email: z.string().email()
})

type ForgotPasswordInput = z.infer<typeof schema>

const ForgotPasswordForm = () => {
    const methods = useForm<ForgotPasswordInput>({
        resolver: zodResolver(schema),
    });
    const {
        handleSubmit,
        register,
    } = methods;

    const onSubmit = async (data: FieldValues) => {
        toast.loading("Loading...", { id: "loading" })
        const response = await apiInstance.post('/api/v1/auth/forgot-password', data);
        Cookies.set('accessToken', response.data.data.access_token);
        toast.success(response.data.message)
        toast.remove("loading")
        setTimeout(() => {
            window.location.replace("/auth/reset-password")
        })
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

            <div className="mb-5">
                <button
                    type="submit"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                >
                    Send Email
                </button>
            </div>

            <div className="mt-6 text-center">
                <p>
                    Remember the password?{" "}
                    <Link href="/auth/login" className="text-primary">
                        Login
                    </Link>
                </p>
            </div>
        </form>
    )
}

export default ForgotPasswordForm