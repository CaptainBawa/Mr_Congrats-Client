import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { logout } from '../../redux/slice/authSlice';

const Logout = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
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
    } catch (error) {
      setError(`Error logging out: ${error.message}`);
    }
  };

  return (
    <div>
      {error && <div className="error">{error}</div>}
      <button type="button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
