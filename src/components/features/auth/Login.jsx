import React, { useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const LoginPage = () => {
  const { userLogin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await userLogin(email, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="bg-white px-8 py-10 border border-gray-300 rounded-sm shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg">
        <h2 className="text-3xl font-bold text-[#383838] text-center mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-400 rounded-sm "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-400 rounded-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-[#383838] text-white py-3 rounded-sm font-medium cursor-pointer hover:bg-[#ff4141] transition-all"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
