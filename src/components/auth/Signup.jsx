import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormErrMsg from "../FormErrMsg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BASE_URL from "../../utils/url";
const schema = yup
  .object()
  .shape({
    username: yup.string().required("Username is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(17, "Password cannot exceed 17 characters")
      .required("Password is required"),
  })
  .required();

const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth`, data);
      console.log(response.data);
      toast.success("Created account successfully!");

      // Store success message in localStorage
      localStorage.setItem(
        "signupSuccessMessage",
        "Created account successfully!"
      );

      navigate("/login");
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error("Error occurred during signup. Please try again.");
    }
  };

  return (
    <section className="px-3 mb-12">
      <div className="section flex bg-white flex-col lg:m-auto px-6 lg:px-0 mt-22 lg:mt-6 pb-3 w-full lg:w-extraLgW">
        <div className="header flex flex-col items-center gap-6 w-full pt-8">
          <div className="text text-primary-100 text-5xl font-bold">
            Sign Up
          </div>
          <div className="underline w-18 h-2 bg-primary-100 rounded-lg"></div>
        </div>
        <form
          className="w-full flex flex-col justify-center items-center"
          onSubmit={handleSubmit(submitForm)}
        >
          <div className="inputs">
            <div className="input">
              <FaUser className="icons" size={28} />
              <input
                type="text"
                name="username"
                placeholder="Username"
                {...register("username")}
              />
            </div>
            <FormErrMsg errors={errors} inputName="username" />
          </div>
          <div className="inputs">
            <div className="input">
              <MdEmail className="icons" size={28} />
              <input
                type="email"
                name="email"
                placeholder="Email"
                {...register("email")}
              />
            </div>
            <span className="text-red-500 text-center">
              <FormErrMsg errors={errors} inputName="email" />
            </span>
          </div>
          <div className="inputs">
            <div className="input">
              <FaLock className="icons" size={28} />
              <input
                type="password"
                name="password"
                placeholder="Password"
                {...register("password")}
              />
            </div>
            <span className="text-red-500 text-center">
              <FormErrMsg errors={errors} inputName="password" />
            </span>
          </div>
          <div className="forgot-password mt-7 text-primary-200 text-lg">
            Already have an account?
            <Link to="/login" className="text-primary-400 cursor-pointer ml-1">
              Login
            </Link>
          </div>

          <div className="submit-container flex gap-7 py-8 mx-auto">
            <button type="submit" className="submit">
              Sign Up
            </button>
            <ToastContainer
              position="top-right"
              autoClose={1000}
              theme="colored"
              hideProgressBar={true}
              draggable
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default Signup;
