import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slice/authSlice';
import logo from '../assets/mrcongrats.jpg';

const Navigation = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const handleToggleMenu = () => {
    setMenuVisible((prevState) => !prevState);
  };

  const handleLogout = () => {
    dispatch(logout());
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
      <div className="mobile-nav">
        <img src={logo} alt="logo" />
        <div className="mobile-toggle">
          <button type="button" onClick={handleToggleMenu}>
            +
          </button>
        </div>
      </div>
      <nav className={`nav-menu ${menuVisible ? 'visible' : ''}`}>
        <button type="button" onClick={handleToggleMenu}>
          X
        </button>
        <ul>
          <li className="nav-list-item"><a href="#skill">Home</a></li>
          <li className="nav-list-item"><a href="#work">About Us</a></li>
          {isAuthenticated ? (
            <li className="nav-list-item">
              <button type="button" onClick={handleLogout}>Logout</button>
            </li>
          ) : (
            <>
              <li className="nav-list-item"><a href="#projects">Login</a></li>
              <li className="nav-list-item"><a href="#blog">Sign Up</a></li>
            </>
          )}
          <li className="nav-list-item"><a href="#contact">Contact Us</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
