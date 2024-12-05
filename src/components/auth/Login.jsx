import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormErrMsg from "../FormErrMsg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Validation schema
const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(17, "Password cannot exceed 17 characters")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // Show toast on page load if a signup success message is stored in localStorage
  useEffect(() => {
    const successMessage = localStorage.getItem("signupSuccessMessage");
    if (successMessage) {
      toast.success(successMessage);
      localStorage.removeItem("signupSuccessMessage");
    }
  }, []);

  const submitForm = (data) => {
    axios
      .post("http://localhost:3001/auth/login", data)
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          const { accessToken, id } = response.data;
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("userId", id);

          // Set the login success flag to show the toast in Home
          localStorage.setItem("loginSuccess", "true");

          navigate("/"); // Navigate to Home page after successful login
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        toast.error("Error couldn't Log In. Please try again.");
      });
  };

  return (
    <section className="px-3 mb-12">
      <div className="section flex bg-white flex-col lg:m-auto px-6 lg:px-0 mt-22 lg:mt-6 pb-3 w-full lg:w-extraLgW">
        <div className="header flex flex-col items-center gap-6 w-full pt-8">
          <div className="text text-primary-100 text-5xl font-bold">Login</div>
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
                placeholder="UserName"
                {...register("username")}
              />
            </div>
            <FormErrMsg errors={errors} inputName="username" />
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
            <FormErrMsg errors={errors} inputName="password" />
          </div>
          <div className="forgot-password mt-7 text-primary-200 text-lg">
            Don't have an Account yet?
            <Link to="/signup" className="text-primary-400 cursor-pointer ml-1">
              Sign Up
            </Link>
          </div>
          <div className="submit-container flex gap-7 py-8 mx-auto">
            <button type="submit" className="submit">
              Login
            </button>
          </div>
        </form>
      </div>

      {/* Toast container for toasts */}
      <ToastContainer
        position="top-right"
        autoClose={1000}
        theme="colored"
        hideProgressBar={true}
        draggable
      />
    </section>
  );
};

export default Login;
