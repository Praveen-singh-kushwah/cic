
import React, { useRef } from "react";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2


const ProtectedRoute = ({ isAuthenticated, children }) => {
  // Use a ref to track if the alert has already been shown
  const alertShown = useRef(false);


  if (!isAuthenticated) {
    if (!alertShown.current) {
      Swal.fire({
        icon: "warning",
        title: "Please Sign In",
        text: "You need to sign in to access this page.",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
      });
      alertShown.current = true; // Set to true to prevent further alerts
    }
    return <Navigate to="/" replace />;
  }


  return children;
};


export default ProtectedRoute;
