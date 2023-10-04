import React, { useState } from 'react';
import axios from 'axios';

const Logout = () => {
  const [error, setError] = useState(null);

  const handleLogout = async () => {
    try {
      await axios.delete('http://localhost:3000/logout');
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
