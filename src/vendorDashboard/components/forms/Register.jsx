import React, { useState } from 'react';
import { API_URL } from '../../data/apiPath';
import { ThreeCircles } from 'react-loader-spinner';

const Register = ({ showLoginHandler }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/vendor/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Vendor registered successfully");
        setUsername("");
        setEmail("");
        setPassword("");
        showLoginHandler();
      } else {
        setError(data?.error || "Registration failed. Please try again.");
      }

    } catch (err) {
      console.error("Registration failed", err);
      setError("Cannot connect to the server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registerSection">
      {loading ? (
        <div className="loaderSection">
          <ThreeCircles
            visible={true}
            height={100}
            width={100}
            color="#4fa94d"
            ariaLabel="three-circles-loading"
          />
          <p>Hi, Your Registration is under process...</p>
        </div>
      ) : (
        <form className="authForm" onSubmit={handleSubmit} autoComplete="off">
          <h3>Vendor Register</h3>

          {error && <p className="error-message">{error}</p>}

          <label>Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your name"
            required
          /><br />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          /><br />

          <label>Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          /><br />

          <span className="showPassword" onClick={handleShowPassword}>
            {showPassword ? "Hide" : "Show"}
          </span>

          <div className="btnSubmit">
            <button type="submit">Submit</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Register;
