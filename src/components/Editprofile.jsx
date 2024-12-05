import React, { useState } from "react";
import { FaCamera } from "react-icons/fa";
import noprofil from "../assets/noprofil.jpg";
import FormErrMsg from "../components/FormErrMsg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { useNavigate } from "react-router-dom";

const schema = yup
  .object()
  .shape({
    oldPassword: yup
      .string()
      .max(17, "Password cannot exceed 17 characters")
      .required("Password is required"),
    newPassword: yup
      .string()

      .max(17, "New Password cannot exceed 17 characters")
      .required("New Password is required"),
  })

  .required();

const EditProfile = () => {
  const [profileImage, setProfileImage] = useState(noprofil);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigator = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const updateForm = async (data) => {
    try {
      // Update password
      const response = await axios.put(
        "http://localhost:3001/auth/editProfile",
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
  
      if (response.data.error) {
        // Show server-provided error message
        toast.error(response.data.error);
      } else {
        // Show success message for profile update
        toast.success("Profile updated successfully!");
        navigate("/"); // Redirect after success
      }
  
 
    } catch (error) {
      // Handle unexpected errors
      const errorMessage =
        error.response?.data?.error;
      toast.error(errorMessage); // Display error message in toast
      reset();
      console.error("There was an error updating the profile:", error);
    }
  };
  

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profileImage", file);

      try {
        const response = await axios.put(
          "http://localhost:3001/auth/uploadProfileImage",
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data.message) {
          console.log(response.data.message);
          const imageUrl = URL.createObjectURL(file);
          setProfileImage(imageUrl);
          toast.success("Profile picture Uploaded!");
        }
      } catch (error) {
        console.error("Error uploading profile image:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-[170px]">
      <header className="bg-bgColors w-full flex flex-col items-center py-4">
        <form>
          <div className="upload relative">
            <img
              src={profileImage}
              alt="Profile"
              className="rounded-[100%] w-[100px] h-[100px] bg-center object-cover"
            />
            <div className="round absolute bottom-0 right-0">
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleImageUpload}
                aria-label="Upload Profile Image"
                data-testid="file-input"
              />

              <FaCamera className="text-3xl" />
            </div>
          </div>
        </form>
      </header>
      <main className="w-full max-w-md px-4 mt-4">
        <form
          className="bg-white shadow-sm rounded-lg p-4"
          onSubmit={handleSubmit(updateForm)}
        >
          <div className="mb-4">
            <label htmlFor="oldPassword" className="block text-gray-700 mb-2">
              Old Password
            </label>
            <input
              id="oldPassword"
              type="password"
              name="oldPassword"
              placeholder="***************"
              className="w-full px-3 py-2 border rounded"
              {...register("oldPassword")}
            />
            <FormErrMsg errors={errors} inputName="oldPassword" />
          </div>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-gray-700 mb-2">
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              name="newPassword"
              placeholder="***************"
              className="w-full px-3 py-2 border rounded"
              {...register("newPassword")}
            />
            <FormErrMsg errors={errors} inputName="newPassword" />
          </div>
          <button
            type="submit"
            className="bg-black text-white py-2 px-4 rounded w-full"
          >
            Update
          </button>
        </form>
      </main>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        theme="colored"
        hideProgressBar={true}
        draggable
      />
    </div>
  );
};

export default EditProfile;
