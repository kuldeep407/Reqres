import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../common/Spinner";
import toast from "react-hot-toast";

export default function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUserById = async () => {
    try {
      setLoading(true);
      const url = `${import.meta.env.VITE_API_URL}/api/users/${id}`;

      const response = await axios.get(url);
      console.log(response.data);

      if (response.data) {
        setUser(response.data.data);
      } else {
        toast.error("User not found!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserById();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="w-[77%] mx-auto mt-32 bg-white border border-gray-200 shadow-md rounded-sm p-6 sm:p-10 relative">
      <h1 className="text-[#383838] text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6">
        User Detail Page
      </h1>

      {user ? (
        <div className="flex flex-col items-center w-full">
          <div className="relative flex justify-center w-full">
            <img
              src={user.avatar}
              alt={user.first_name}
              className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full border-3 border-blue-500 shadow-xl bg-white"
            />
          </div>


          <div className="text-center mt-6 px-4 sm:px-6 md:px-10">
            <p className="text-xl sm:text-2xl font-semibold text-gray-800">
              {user.first_name} {user.last_name}
            </p>
            <p className="text-sm sm:text-base font-medium text-gray-500 mt-1">
              {user.email}
            </p>
          <div className="w-full h-[1px] bg-gray-300 mt-6"></div>

            <p className="text-sm sm:text-md md:text-lg text-gray-700 mt-4 leading-relaxed text-justify">
              I'm a proficient developer with expertise in modern web
              technologies and a passion for building scalable applications.
              With over X years of experience in full-stack development, I
              specialize in crafting efficient, user-friendly solutions. My
              skill set includes JavaScript, React, Node.js, and database
              management, ensuring seamless integration between frontend and
              backend. I thrive in collaborative environments, constantly
              learning and adapting to new technologies. Beyond coding, I enjoy
              problem-solving and optimizing system performance for better user
              experiences. My goal is to create impactful digital solutions that
              enhance productivity and innovation.
            </p>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg">User not found.</p>
      )}
    </div>
  );
}
