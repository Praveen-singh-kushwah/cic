import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { GoogleLogin } from '@react-oauth/google';


const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  useEffect(() => {
    // Check if the user is authenticated when the component loads
    const authState = localStorage.getItem('isAuthenticated');
    if (authState) {
      setIsAuthenticated(JSON.parse(authState));
    }
  }, [setIsAuthenticated]);


  const handleLoginSuccess = (credentialResponse) => {
    console.log('Login Success:', credentialResponse);
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', true); // Persist the state
  };


  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated'); // Clear the state
  };


  return (
    <nav className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-2 sm:py-3 bg-blue-600 text-white shadow-md fixed w-full z-50">
      {/* Logo/Brand */}
      <div className="text-xl sm:text-2xl md:text-3xl font-bold tracking-wide">
        IntentClassification
      </div>


      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-4 sm:space-x-6 font-semibold font-serif">
        <Link to="/" className="text-sm sm:text-base md:text-lg hover:underline px-2 py-1 rounded transition-colors">
          Home
        </Link>
        <Link to="/DatasetUpload" className="text-sm sm:text-base md:text-lg hover:underline px-2 py-1 rounded transition-colors">
          DatasetUpload
        </Link>
        <Link to="/singleQuery" className="text-sm sm:text-base md:text-lg hover:underline px-2 py-1 rounded transition-colors">
          Single Query
        </Link>
        <Link to="/Results" className="text-sm sm:text-base md:text-lg hover:underline px-2 py-1 rounded transition-colors">
          Results
        </Link>
      </div>


      {/* Auth Buttons (Desktop and Mobile) */}
      <div className="hidden md:flex items-center">
        {!isAuthenticated ? (
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={() => console.log('Login Failed')}
            size="medium"
          />
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 sm:px-4 py-1 sm:py-2 rounded-md text-xs sm:text-sm md:text-base font-bold hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        )}
      </div>


      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button
          id="menu-btn"
          className="text-white focus:outline-none p-2"
          onClick={toggleMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5.25h16.5m-16.5 6.75h16.5m-16.5 6.75h16.5"
            />
          </svg>
        </button>
      </div>


      {/* Mobile Menu */}
      <div
        id="menu"
        className={`${isMenuOpen ? 'flex' : 'hidden'
          } md:hidden flex-col items-center space-y-4 bg-blue-700 w-full py-4 shadow-lg absolute top-full left-0 right-0`}
      >
        <Link to="/" className="text-base hover:underline px-4 py-2 w-full text-center hover:bg-blue-800 transition-colors" onClick={toggleMenu}>
          Home
        </Link>
        <Link to="/DatasetUpload" className="text-base hover:underline px-4 py-2 w-full text-center hover:bg-blue-800 rounded transition-colors" onClick={toggleMenu}>
          DatasetUpload
        </Link>
        <Link to="/singleQuery" className="text-base hover:underline px-4 py-2 w-full text-center hover:bg-blue-800 rounded transition-colors" onClick={toggleMenu}>
          Single Query
        </Link>
        <Link to="/Results" className="text-base hover:underline px-4 py-2 w-full text-center hover:bg-blue-800 rounded transition-colors" onClick={toggleMenu}>
          Results
        </Link>
        {!isAuthenticated ? (
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={() => console.log('Login Failed')}
            size="medium"
          />
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded-md text-sm font-bold hover:bg-red-600 transition-colors w-full mt-2"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};


export default Navbar;
