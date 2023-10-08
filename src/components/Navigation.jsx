import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Logout from './auth/Logout';
import logo from '../assets/mrcongrats.jpg';

const Navigation = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.user.data.role);

  const handleToggleMenu = () => {
    setMenuVisible((prevState) => !prevState);
  };

  useEffect(() => {
    const handleListItemClick = () => {
      setMenuVisible(false);
    };

    const listItems = document.querySelectorAll('.nav-list-item');
    listItems.forEach((item) => {
      item.addEventListener('click', handleListItemClick);
    });

    return () => {
      listItems.forEach((item) => {
        item.removeEventListener('click', handleListItemClick);
      });
    };
  }, []);

  return (
    <header>
      {isAuthenticated ? (
        <div className="mobile-nav">
          <img src={logo} alt="logo" />
          <Logout />
          {userRole === 'admin' && <Link to="/prince">Admin Panel</Link>}
          <div className="mobile-toggle">
            <button type="button" onClick={handleToggleMenu}>
              +
            </button>
          </div>
        </div>
      ) : (
        <div className="mobile-nav">
          <img src={logo} alt="logo" />
          <div className="mobile-toggle">
            <button type="button" onClick={handleToggleMenu}>
              +
            </button>
          </div>
        </div>
      )}
      <nav className={`nav-menu ${menuVisible ? 'visible' : ''}`}>
        <button type="button" onClick={handleToggleMenu}>
          X
        </button>
        <ul>
          <li className="nav-list-item"><a href="#skill">Home</a></li>
          <li className="nav-list-item"><a href="#work">About Us</a></li>
          <li className="nav-list-item"><a href="#projects">Login</a></li>
          <li className="nav-list-item"><a href="#blog">Sign Up</a></li>
          <li className="nav-list-item"><a href="#contact">Contact Us</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
