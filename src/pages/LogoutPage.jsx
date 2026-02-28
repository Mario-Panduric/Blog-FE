import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

const LogoutPage = () => {
  const navigate = useNavigate();
  
  const cancelLogout = () => {
    navigate("/home");
  }
  
  const handleLogout = () => {
    localStorage.clear();
    fetch("http://localhost:5020/api/Users/Logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((response) => {
      if (response.status === 204) {
        navigate("/");
      }
    });
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center items-center">
        <h1>Are you sure you want to log out?</h1>
        <div>
          <button
            className="w-20 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 m-2 rounded"
            onClick={handleLogout}
          >
            Yes
          </button>
          <button
            className="w-20 bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded"
            onClick={cancelLogout}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;
