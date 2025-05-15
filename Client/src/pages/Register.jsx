import React, { useState } from "react";
import axios from "axios";
import Logo from "../components/Logo";
import search from "../assets/search.svg";

import "../styles/Register.css";
import HideIcon from "../assets/hide-icon.png";
import ShowIcon from "../assets/show-icon.png";
import MainLogo from "../assets/MainLogo.png";

import { useNavigate } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        form
      );
      setSuccess(res.data.message);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  }

  function handleLogin() {
    navigate("/login");
  }
  function handleSignUp() {
    navigate("/");
  }

  return (
    <div className="registration-container">
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
      <div className="main-container">
        <div className="left-part">
          <h1 className="left-title">Transfer With us.</h1>
          <p className="left-subtitle">
            Access the Transfer upto 5GB for free.
          </p>
          <img src={MainLogo} alt="logo" className="signup-image" />
        </div>
        <div className="form-info">
          <div className="frame-1">
            <h3>Sign up now</h3>
            <div className="details-container">
              <div className="names">
                <div className="fname-frame">
                  <label htmlFor="fname" className="fname">
                    First Name <span>*</span>{" "}
                  </label>
                  <input
                    type="text"
                    id="fname"
                    className="fn"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                  />
                  <p className="for_fname"></p>
                </div>

                <div className="lname-frame">
                  <label htmlFor="lname" className="fname">
                    Last Name <span>*</span>{" "}
                  </label>
                  <input
                    type="text"
                    id="lname"
                    className="ln"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                  />
                  <p className="for_lname"></p>
                </div>
              </div>

              <div className="gmail-container">
                <div className="gmail-frame">
                  <label htmlFor="Gm" className="gmail">
                    Email Address <span>*</span>{" "}
                  </label>
                  <input
                    type="gmail"
                    id="Gm"
                    className="gm"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                  <p className="for_gmail"></p>
                </div>
              </div>

              <div className="phone-container">
                <div className="phone-frame">
                  <label htmlFor="Pn" className="phone">
                    Phone number <span>*</span>{" "}
                  </label>
                  <div className="phone-input-wrapper">
                    <select className="country-select">
                      <option value="+91">🇮🇳 +91</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+44">🇬🇧 +44</option>
                    </select>
                    <input
                      type="tel"
                      id="Pn"
                      className="pn"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
              </div>

              <div className="password-container">
                <div className="password-frame">
                  <label htmlFor="password" className="password-label">
                    Password <span>*</span>{" "}
                  </label>
                  <div className="password-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      className="password-input"
                      value={form.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="toggle-btn"
                    >
                      <img
                        src={showPassword ? ShowIcon : HideIcon}
                        alt="toggle visibility"
                        className="hide"
                      />
                    </button>
                    <p className="password-text">
                      use 8 or more characters with a mix of letters, numbers &
                      symbols.{" "}
                    </p>
                  </div>
                </div>
              </div>

              <div className="agrement-container">
                <div className="argrement-frame">
                  <div className="argm-1">
                    <input
                      type="checkbox"
                      className="arg-1"
                      htmlFor="first-agr"
                      required
                    />
                    <p id="first-agr" className="argm-para1">
                      By creating an account, I agree to our Terms of use and
                      Privacy Policy.{" "}
                    </p>
                  </div>

                  <div className="argm-2">
                    <input
                      type="checkbox"
                      className="arg-2"
                      htmlFor="second-agr"
                      required
                    />
                    <p id="second-agr" className="argm-para2">
                      By creating an account, I am also consenting to receive
                      SMS messages and emails,
                      <br />
                      including product new feature updates, events, and
                      marketing promotions.{" "}
                    </p>
                  </div>
                </div>
              </div>

              <div className="sub-container">
                <div className="submit-frame">
                  <button className="submit-btn" onClick={handleSubmit}>
                    Sign Up
                  </button>
                  <p className="submit-para">
                    Already have an account? <a href="/login"> Log in</a>{" "}
                  </p>
                </div>
              </div>

              {error && (
                <p style={{ color: "red", textAlign: "center" }}>{error}</p>
              )}
              {success && (
                <p style={{ color: "green", textAlign: "center" }}>{success}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
