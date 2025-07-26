import React, { useState } from "react";
import axios from "axios";
import Logo from "../components/Logo";
import search from "../assets/search.svg";
import "../styles/Login.css";
// import HideIcon from "../assets/hide-icon.png";
// import ShowIcon from "../assets/show-icon.png";

import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleLogin() {
    navigate("/login");
  }
  function handleSignUp() {
    navigate("/");
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );
      localStorage.setItem("token", res.data.token);
      setLoading(false);
      navigate("/home");
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="Login-container">
      <div className="header-nav">
        <Logo />
        <div className="login-signup">
          <div className="search">
            <img src={search} alt="search-logo" className="sea" />
            <p className="input-search">Search </p>
          </div>
          <div className="drop-box">
            <select>
              <option>English(united states)</option>
              <option>Japan</option>
              <option>India</option>
            </select>
          </div>
          <div>
            <button className="btn-1" onClick={handleLogin}>
              Login
            </button>
          </div>
          <div>
            <button className="btn-2" onClick={handleSignUp}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
      <hr />

      {/* This is Login part */}
      <div className="password-container-login">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Log In</h1>
          <p className="signup-text">
            New to Transfer File? <a href="/">Sign up for free</a>
          </p>

          <div className="username">
            <label htmlFor="gmail-id">Email Address</label>
            <input
              type="email"
              className="gml"
              id="gmail-id"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="user-password">
            <label htmlFor="password-id">Password</label>
            <input
              type="password"
              className="pss"
              id="password-id"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <a href="#" className="forgot-password">
            Forgot password?
          </a>
          {error && (
            <p style={{ color: "red", textAlign: "center" }}>{error}</p>
          )}
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
