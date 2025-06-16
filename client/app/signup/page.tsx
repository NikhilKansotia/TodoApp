"use client";

import { signup } from "@/utils/APIs";
import { APIRequest } from "@/utils/networkCalls";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";

interface FormData {
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
}

const Signup = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const mutation = useMutation({
    mutationFn: (data: FormData) =>
      APIRequest({ url: `${signup}`, data: { ...data } }),
    onSuccess: (res) => {
      toast.success(res.message);
      router.push("/login");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm p-8 bg-white rounded-4xl shadow-2xl"
      >
        <h1 className="text-xl text-center text-gray-500 mb-6">
          Welcome to your customized Todo App! Stay organized and productive.
        </h1>
        <h1 className="mb-6 text-3xl font-bold text-center text-blue-600">
          Sign Up
        </h1>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Username</label>
          <input
            {...register("username", { required: "Username is required" })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.username && (
            <p className="mt-1 text-sm text-red-500">
              {errors.username.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Email ID</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
            })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: "Password is required" })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium">Phone Number</label>
          <input
            type="tel"
            {...register("phoneNumber", {
              required: "Phone Number is required",
            })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.phoneNumber && (
            <p className="mt-1 text-sm text-red-500">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>
        <p className="text-sm mb-3">
          Already have an accont ?{" "}
          <a href="/login" className="text-blue-500">
            Login
          </a>
        </p>
        <button
          type="submit"
          className="w-full py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
