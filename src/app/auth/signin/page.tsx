import React from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import LoginForm from "@/app/features/auth/LoginForm";
import LoginGraphic from "@/app/features/auth/LoginGraphic";
import AuthLayout from "@/components/Layouts/AuthLayout";


export const metadata: Metadata = {
  title: "Next.js SignIn Page | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Signin Page TailAdmin Dashboard Template",
};

const SignIn: React.FC = () => {
  return (
    <AuthLayout>
      {/* <Breadcrumb pageName="Sign In" /> */}

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="px-26 py-17.5 text-center">
              <Link className="mb-5.5 inline-block" href="/">
                <Image
                  className=""
                  src={"https://lasgcce.com/wp-content/uploads/2021/01/Construction-Est-logo.png"}
                  alt="Logo"
                  width={300}
                  height={54}
                />

              </Link>

              <p className="2xl:px-20">
                Please using your credentials or request access from the admin
              </p>

              <span className="mt-15 inline-block">
                <LoginGraphic />
              </span>
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <span className="mb-1.5 block font-medium">Start for free</span>
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign In to Lasgcce
              </h2>

              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignIn;
