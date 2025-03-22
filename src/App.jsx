
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import DatasetUploadPage from "./pages/DatasetUploadPage";
import QueryInputPage from "./pages/QueryInputPage";
import Results from "./pages/Results";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  useEffect(() => {
    // Check for authentication state on load
    const authState = localStorage.getItem('isAuthenticated');
    if (authState) {
      setIsAuthenticated(JSON.parse(authState));
    }
  }, []);


  return (
    <Router>
      <div className="w-full fixed top-0 z-50">
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      </div>
      <div className="pt-16 min-h-screen"> {/* Add padding-top to account for Navbar height */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/DatasetUpload"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <DatasetUploadPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/singleQuery"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <QueryInputPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Results"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Results />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
