import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { logout } from '../../redux/slice/authSlice';

const Logout = () => {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.user.jwt_token);

  const handleLogout = async () => {
    try {
      if (!token) {
        setError('JWT token not found in redux store.');
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      await axios.delete('http://localhost:3000/logout', { headers });
      dispatch(logout());
      setTimeout(() => {
        setSuccessMessage('Logout successful');
      }, 5000);
      sessionStorage.clear();
      navigate('/');
    } catch (error) {
      setError(`Error logging out: ${error.message}`);
    }
  };

  return (
    <div>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <button type="button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
