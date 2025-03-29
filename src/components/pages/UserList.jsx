import * as React from "react";
import { useState, useContext, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Modal,
  Box,
  TextField,
  Button,
} from "@mui/material";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";

export default function UserList() {
  const {
    users,
    currentPage,
    setCurrentPage,
    totalPages,
    rowsPerPage,
    setRowsPerPage,
    fetchUsers,
    setLoading,
    setUsers,
  } = useContext(UserContext);

  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchTerm(query);
    setFilteredUsers(
      users.filter((user) =>
        `${user?.first_name || ""} ${user?.last_name || ""}`
          .toLowerCase()
          .includes(query)
      )
    );
  };

  const handleChangePage = (event, newPage) => setCurrentPage(newPage + 1);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/users/${id}`);
      toast.success("User deleted successfully!");
      fetchUsers();
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleInputChange = (e) => {
    setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value });
  };

  const handleUpdateUser = async () => {
    try {
      setLoading(true);
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/users/${selectedUser.id}`,
        {
          first_name: selectedUser.first_name,
          last_name: selectedUser.last_name,
          email: selectedUser.email,
        }
      );
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id ? selectedUser : user
        )
      );
      toast.success("User updated successfully!");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to update user!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-4 md:w-[80%] mx-auto mt-28 overflow-x-auto">
      <Box display="flex" justifyContent="flex-end" my={2}>
        <TextField
          id="search"
          label="Search by Name"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          sx={{ width: "100%", maxWidth: 300 }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", paddingLeft: "44px" }}>Avatar</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>First Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Last Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/user/${user.id}`}>
                    <img
                      src={user.avatar}
                      alt="User Avatar"
                      className="w-12 h-12 rounded-full ml-7"
                    />
                  </Link>
                </TableCell>
                <TableCell>{user.first_name}</TableCell>
                <TableCell>{user.last_name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <div className="flex gap-3 text-xl text-red-500">
                    <FaEdit
                      className="cursor-pointer hover:text-red-700"
                      onClick={() => handleEditClick(user)}
                    />
                    <MdDelete
                      className="cursor-pointer hover:text-red-700"
                      onClick={() => deleteUser(user.id)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[6, 12, 24]}
        component="div"
        count={totalPages * rowsPerPage}
        rowsPerPage={rowsPerPage}
        page={currentPage - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <h2 className="text-xl font-bold mb-4">Edit User</h2>
          <TextField
            label="First Name"
            name="first_name"
            value={selectedUser?.first_name || ""}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            name="last_name"
            value={selectedUser?.last_name || ""}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={selectedUser?.email || ""}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <div className="flex gap-4 mt-4">
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateUser}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
