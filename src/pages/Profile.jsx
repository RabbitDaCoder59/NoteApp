import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import axios from "axios";
import BASE_URL from "../utils/url";
const Profile = () => {
  const userId = localStorage.getItem("userId");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/auth/userInfo/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        setUsername(response.data.username);
        setEmail(response.data.email);
        setProfileImage(response.data.profileImage);
      })
      .catch((error) => {
        console.error("There was an error fetching the user data:", error);
      });
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <div className="">
      <div className="flex pb-4 flex-col items-center bg-gray-100 min-h-[170px]">
        <header className="bg-bgColors w-full flex flex-col items-center py-4">
          <img
            src={
              profileImage
                ? `${BASE_URL}/uploads/${profileImage}`
                :"../../src/assets/noprofil.jpg"
            }
            alt="Profile"
            className="rounded-full object-cover w-24 h-24 mb-2"
          />
          <button className="bg-black text-white py-1 px-4 rounded">
            <Link to="/editprofile">Edit Profile</Link>
          </button>
        </header>
        <main className="w-full max-w-md">
          <section className="mt-4">
            <h2 className="text-lg font-semibold px-4">Details</h2>
            <div className="bg-white shadow-sm rounded-lg p-4 mt-2">
              <div className="py-2">
                <label className="block text-gray-700">Username</label>
                <p className="mt-1">{username}</p>
              </div>
              <div className="py-2">
                <label className="block text-gray-700">Email</label>
                <p className="mt-1">{email}</p>
              </div>
            </div>
          </section>
          <section className="mt-4">
            <h2 className="text-lg font-semibold px-4">Preferences</h2>
            <div className="bg-white shadow-sm rounded-lg p-4 mt-2">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 py-2"
              >
                <MdLogout className="text-2xl" /> LogOut
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Profile;
