import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [redirectToAdmin, setRedirectToAdmin] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://localhost:7001/api/AdminAPI/Login",
        {
          adminId: 0,
          username: "string",
          email: "admin1@gmail.com",
          password: "admin1",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data === 1) {
        setLoginStatus("Login successful");
        setRedirectToAdmin(true);
      } else {
        setLoginStatus("Invalid email or password");
      }
    } catch (error) {
      console.error("Error:", error);
      setLoginStatus("An error occurred");
    }
  };

  return (
    <div
      className="login-container"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/309944/pexels-photo-309944.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
      }}
    >
      <div className="form-wrapper">
        <form className="login-form" onSubmit={handleLogin}>
          <h1>Please login to your account</h1>
          <div className="input-container">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="buttonlogin">
            Log in
          </button>
          {loginStatus && <p>{loginStatus}</p>}
        </form>
      </div>
      {redirectToAdmin && <Navigate to="/admin dashboard" />}
    </div>
  );
};

export default Login;
