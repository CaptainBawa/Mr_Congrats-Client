import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3000/signup', {
        user: {
          name, email, password,
        },
      });
      navigate('/login');
    } catch (error) {
      if (error.response) {
        const errorData = error.response.data;
        const errorMessage = errorData.message || 'An error occurred during signup.';
        setErrorMessage(errorMessage);
      } else if (error.request) {
        setErrorMessage('No response from the server. Please try again later.');
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Signup</h2>
      <p>
        Already have an account?
        <Link to="/login">Login</Link>
      </p>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="name" value={name} onChange={(e) => setname(e.target.value)} className="input-field" />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" />
        <button type="submit" className="login-button">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
