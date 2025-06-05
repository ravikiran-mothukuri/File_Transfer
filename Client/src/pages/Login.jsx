import React, { useState } from "react";
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
    </div>
  );
};

export default Login;
