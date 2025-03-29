import React from "react";
import { Routes, Route } from "react-router-dom";
import UserList from "./components/pages/UserList";
import Login from "./components/features/auth/Login";
import Navbar from "./components/common/Navbar";
import UserDetails from "./components/pages/UserDetails";
import Footer from "./components/common/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/users" element={<UserList />} />
        <Route path="/" element={<Login />} />
        <Route path="/user/:id" element={<UserDetails />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
