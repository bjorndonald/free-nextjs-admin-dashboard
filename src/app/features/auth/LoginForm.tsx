"use client";
import EmailIcon from '@/app/ui/icons/Email.icon'
import PasswordIcon from '@/app/ui/icons/Password.icon'
import React, { useActionState } from 'react'
import {zodResolver} from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FieldValues, useForm } from 'react-hook-form';
import Link from 'next/link';
import toast from 'react-hot-toast';
import apiInstance from '@/services/api';
import Cookies from 'js-cookie'

const schema = z.object({
    email: z.string().email(),
    password: z.string()
})

type LoginUserInput = z.infer<typeof schema>

const LoginForm = () => {
    const methods = useForm<LoginUserInput>({
        resolver: zodResolver(schema),
    });
    const {
        handleSubmit,
        register,
    } = methods;

    const onSubmit = async (data: FieldValues) => {
        toast.loading("Loading...", {id:"loading"})
        const response = await apiInstance.post('/api/v1/auth/login', data);
        Cookies.set('accessToken', response.data.data.access_token);
        toast.success(response.data.message)
        toast.remove("loading")
        window.location.href = "/"
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
                  Password
              </label>
              <div className="relative">
                  <input
                  {...register("password")}
                      type="password"
                      placeholder="6+ Characters, 1 Capital letter"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />

                  <span className="absolute right-4 top-4">
                      <PasswordIcon />
                  </span>
              </div>
          </div>

          <div className="mt-2 text-center">
                  <Link href="/auth/forgot-password" className="text-primary">
                      Forgot password?
                  </Link>
          </div>

          <div className="mb-5">
              <button
                  type="submit"
                  className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
              >
                  Sign In
                </button>
          </div>

          <div className="mt-6 text-center">
              <p>
                  Don’t have any account?{" "}
                  <Link href="/auth/signup" className="text-primary">
                      Request an account from admin
                  </Link>
              </p>
          </div>
      </form>
  )
}

export default LoginForm