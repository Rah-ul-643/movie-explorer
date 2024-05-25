
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './css/Nav.css';
import toast from 'react-hot-toast';

const Nav = ({ isLoggedIn, setIsLoggedIn }) => {

  const navigate = useNavigate();

  const handleLogOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('user');
    toast.success("Logged out successfully!");
    navigate('/');
  }

  return (

    <motion.nav
      className="navbar"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className='logo'>
        <Link to={'/'}>Movie Explorer</Link>
      </h1>
      <div className='nav-links-container'>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/movies">Movies</Link>
          </li>
        </ul>


        {isLoggedIn ?

          <ul className="nav-links">
            <li>
              <Link to="/watchlist">Watchlist</Link>
            </li>
            <li>
              <button className="logout" onClick={handleLogOut}>Logout</button>
            </li>
          </ul>

          :

          <ul className="nav-links">
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Signup</Link>
            </li>
          </ul>
        }
      </div>

    </motion.nav>
  );
};

export default Nav;