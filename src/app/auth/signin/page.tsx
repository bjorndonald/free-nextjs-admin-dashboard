import React from "react";
import { Metadata } from "next";
import LoginForm from "@/app/features/auth/LoginForm";
import AuthLayout from "@/components/Layouts/AuthLayout";


export const metadata: Metadata = {
  title: "Next.js SignIn Page | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Signin Page TailAdmin Dashboard Template",
};

const SignIn: React.FC = () => {
  return (
    <AuthLayout>
      {/* <Breadcrumb pageName="Sign In" /> */}

      <div className="rounded-sm border max-w-xl mx-auto px-4 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="w-full ">
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
