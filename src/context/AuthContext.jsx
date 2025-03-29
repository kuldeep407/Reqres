import React, { createContext, useEffect, useState } from "react";
import Spinner from "../components/common/Spinner";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  const userLogin = async (email, password) => {
    try {
      setLoading(true);
      const url = `${import.meta.env.VITE_API_URL}/api/login`;

      const response = await axios.post(url, { email, password });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
        toast.success("Login successful!");
        navigate("/users");
      } else {
        toast.error("Invalid credentials!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    setToken("");
    toast.success("Logout successful!");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ loading, userLogin, token, logoutUser }}>
      {loading ? <Spinner /> : children}
    </AuthContext.Provider>
  );
};
