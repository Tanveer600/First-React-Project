import React, { useState } from 'react';
import { loginUser } from '../Services/UserService';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // ✅ Import your CSS file

function UserLogin({setIsLoggedIn }) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await loginUser(userName, password);
    setMessage(response.message);
    setIsSuccess(response.isSuccess);

    if (response.isSuccess) {
      const userData = response.data[0].user;
      localStorage.setItem('user', JSON.stringify(userData));

      setIsLoggedIn(true); // ✅ update state in App.js
      navigate('/transaction');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>
        {message && (
          <div className={`alert ${isSuccess ? 'alert-success' : 'alert-danger'}`}>
            {message}
          </div>
        )}
        <input
          className="login-input"
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}

export default UserLogin;
