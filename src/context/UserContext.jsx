import React, { createContext, useState, useEffect, useCallback } from "react";
import Spinner from "../components/common/Spinner";
import axios from "axios";
import toast from "react-hot-toast";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = useCallback(async (page = 1, perPage = 6) => {
    try {
      setLoading(true);
      const url = `${
        import.meta.env.VITE_API_URL
      }/api/users?page=${page}&per_page=${perPage}`;
      const response = await axios.get(url);

      if (response.data.data) {
        setUsers(response.data.data);
        setCurrentPage(response.data.page);
        setTotalPages(response.data.total_pages);
      } else {
        console.error(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteUser = async (id) => {
    try {
      console.log(id);

      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/users/${id}`
      );

      if (response.status === 200) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        console.log("User deleted successfully!");
      } else {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage, rowsPerPage);
  }, [fetchUsers, currentPage, rowsPerPage]);

  const values = {
    loading,
    users,
    fetchUsers,
    setLoading,
    currentPage,
    setCurrentPage,
    totalPages,
    rowsPerPage,
    setRowsPerPage,
    deleteUser,
    setUsers,
  };

  return (
    <UserContext.Provider value={values}>
      {loading ? <Spinner /> : children}
    </UserContext.Provider>
  );
};
