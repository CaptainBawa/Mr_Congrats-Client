import React, { useState } from 'react';
import axios from 'axios';

const Logout = () => {
  const [error, setError] = useState(null);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('jwtToken');

      if (!token) {
        setError('JWT token not found in localStorage.');
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      await axios.delete('http://localhost:3000/logout', { headers });
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
