import React, { useState } from "react";
<<<<<<< HEAD
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
=======
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

import Logo from "../components/Logo";
import "../styles/Login.css";

const Login= () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();


  const handleChange = async(e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => 
  {
    e.preventDefault();

    const newErrors = {};
    if (!form.email.trim()) {
      newErrors.email = "Email is required!";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required!";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error) {
      alert("Login failed: " + error.message);
      return;
    } else {
      
      console.log("Login success", data);
      localStorage.setItem("isLoggedIn", "true");
      navigate("/homepage");
    }
  };
  };

  return (
    <div className="login-container">

      <div className="logo-container">
        <Logo />
      </div>

      <main className="login-main">
        <div className="login-form-container">

          <div className="login-first-part">
            <h2 className="login-title">Sign In</h2>
            <p className="login-subtitle">
              to continue to your <strong>TransferFiles</strong> account.
            </p>
          </div>

          <form className="form-section-login" onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                id="email"
                type="email"
                name="email"
                className="floating-input"
                placeholder=" "
                value={form.email}
                onChange={handleChange}
              />
              <label htmlFor="email" className="floating-label">Email</label>
              {errors.email && <p className="error-msg">{errors.email}</p>}
            </div>

            <div className="input-group password-group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                className="floating-input"
                placeholder=" "
                value={form.password}
                onChange={handleChange}
              />
              <label htmlFor="password" className="floating-label">Password</label>
              {errors.password && <p className="error-msg">{errors.password}</p>}
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            <button type="submit" className="continue-btn">
              Continue with email
            </button>
          </form>

          <p className="login-text">
            Don’t have an account?{" "}
            <Link to="/" className="login-link">Sign Up</Link>
          </p>

        </div>
      </main>

      <footer className="foor">
        <p>© {new Date().getFullYear()} File Transfer. All rights reserved.</p>
      </footer>
>>>>>>> 04fb2379da1934556ec3b85d0fe981dff5f96871
    </div>
  );
};

<<<<<<< HEAD
export default Register;
=======
export default Login;
>>>>>>> 04fb2379da1934556ec3b85d0fe981dff5f96871
