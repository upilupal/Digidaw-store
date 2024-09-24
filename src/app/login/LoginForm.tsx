"use client";
import Heading from "@/components/Heading";
import InputForm from "@/components/inputs/InputForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SafeUser } from "../../../types";
import SocialButton from "@/components/SocialButton";
import { BsGithub } from "react-icons/bs";

interface LoginFormProps {
  currentUser: SafeUser | null;
}

const LoginForm: React.FC<LoginFormProps> = ({currentUser}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // redirect to cart page if we try to access the login page after we logged in
  useEffect(() => {
    if(currentUser) {
      router.push("/cart");
      router.refresh();
    }
  }, [])

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok && !callback?.error) {
        router.push("/cart");
        router.refresh();
        toast.success("Logged In");
      } 
      
      if (callback?.error) {
        console.error("SignIn error:", callback?.error);
        toast.error(callback?.error || "Failed to login");
      }
    })
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
    .then((callback) => {
      if (callback?. error) {
        toast.error('Invalid credentials')
      }

      if (callback?.ok && !callback.error) {
        toast.success('Logged in!')
        // router.push('/users')
      }
    } )
    .finally(() => setIsLoading(false))
  };

  // this paragraph will appear if we already logged in
  if (currentUser) {
    return <p className="text-center">Logged In. Redirecting...</p>
  }

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
    <form className="space-y-6 flex flex-col items-center" onSubmit={handleSubmit(onSubmit)}>
      <InputForm id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
      <InputForm id="password" label="Password" disabled={isLoading} register={register} errors={errors} required type="password" />
      <Button onClick={handleSubmit(onSubmit)} className="w-1/2">
        {isLoading ? "Loading" : "Log In"}
      </Button>
      </form>

      <div className="mt-6">
          <div className="relative">
              <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">
                      Or continue with
                  </span>
              </div>
          </div>

          <div className="my-6 flex gap-2">
              <SocialButton
              icon={BsGithub}
              onClick={() => socialAction('github')}
              />
              <SocialButton
              icon={FcGoogle}
              onClick={() => socialAction('google')}
              />
          </div>
      </div>
  
      <p className="text-sm md:text-base text-center">
        Don't have an account?{" "}
        <Link href="/register" className="underline hover:opacity-75">
          Sign Up
        </Link>
      </p>
    </div>
  </div>
  );
};

export default LoginForm;