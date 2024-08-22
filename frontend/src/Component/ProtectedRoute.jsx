import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles }) => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");
  
    if (!token) {
      return <Navigate to="/login" />;
    }
  
    if (!userRole) {
      console.error("No role found for the user");
      return <Navigate to="/not-authorized" />;
    }
  
    if (!allowedRoles.includes(userRole)) {
        console.log(userRole);
      return <Navigate to="/not-authorized" />;
    }
    console.log(userRole);
    return children;
  };
  

export default PrivateRoute;
