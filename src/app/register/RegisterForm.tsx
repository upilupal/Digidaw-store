"use client";
import InputForm from "@/components/inputs/InputForm";
import SocialButton from "@/components/SocialButton";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { SafeUser } from "../../../types";

interface RegisterFormProps {
 currentUser: SafeUser | null;
}

const RegisterForm: React.FC<RegisterFormProps> = ({currentUser}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });


  useEffect(() => {
    if(currentUser) {
      router.push("/cart");
      router.refresh();
    }
  },[])


  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Register success");
        signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        }).then((callback) => {
          if (callback?.ok && !callback?.error) {
            router.push("/cart");
            router.refresh();
            toast.success("Logged In");
          } 
          
          if (callback?.error) {
            console.error("SignIn error:", callback?.error);
            toast.error(callback?.error || "Failed to login");
          }

          
        });
      })
      .catch(() => toast.error("Something went wrong"))
      .finally(() => {
        setIsLoading(false);
      });
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

  if(currentUser) {
    return <p className="text-center">Logged in. Redirecting...</p>
  }

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
      <form className="space-y-6 flex flex-col items-center" onSubmit={handleSubmit(onSubmit)}>
        <InputForm id="name" label="Name" disabled={isLoading} register={register} errors={errors} required />
        <InputForm id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
        <InputForm id="password" label="Password" disabled={isLoading} register={register} errors={errors} required type="password" />
        <Button onClick={handleSubmit(onSubmit)} className="w-1/2">
          {isLoading ? "Loading" : "Sign Up"}
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
          Already have an account?{" "}
          <Link href="/login" className="underline hover:opacity-75">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
