import React, { useState } from "react";
<<<<<<< HEAD
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
=======
// import axios from "axios";

import { useNavigate } from "react-router-dom";
import { supabase } from '../supabaseClient';
import { Link } from "react-router-dom";
import Logo from '../components/Logo';
import '../styles/Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm]= useState({
    email: '',
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(false);

  function handleChange(e)
  {
    setForm({...form,[e.target.name]: e.target.value});
  }
  const handlesubmit= async(e)=>{
    

    e.preventDefault();

    const nerrors= {};

    if(!form.email.trim())
      nerrors.email= "Email is Required!";
    else if(!/\S+@\S+\.\S+/.test(form.email))
      nerrors.email= "Enter a Valid Email Address.";

    if (!form.username.trim()) 
      nerrors.username = "First name is required.";
  
    if (!form.password.trim()) 
      nerrors.password = "Password is required.";
    else if (form.password.length < 6) 
      nerrors.password = "Password must be at least 6 characters.";
    
    setErrors(nerrors);

    if (Object.keys(nerrors).length === 0) 
    {

      const {error}= await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data:{
            username: form.username
          }
        }

    });
    if(error)
    {
      alert(error.message);
      return;
    }

   
    const { error: insertError } = await supabase.from("Profiles").insert({
      
      email: form.email,
      username: form.username,
      password: form.password,
      created_at: new Date().toISOString(),
    });

    if (insertError) {
      console.error("Insert error:", insertError.message);
      alert("User created but failed to save profile data.");
    } 
    else 
    {
      setSuccessMessage(true);
      setTimeout(()=>{
        setSuccessMessage(false);
        navigate('/login');
      },3000);  

    }
    }

>>>>>>> 04fb2379da1934556ec3b85d0fe981dff5f96871
  }

  return (
    <div className="registration-container">
<<<<<<< HEAD
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
=======

      {successMessage && (
        <div className="success-popup">
          User registration successful!
        </div>
      )}

      <div className="logo-container">
        <Logo />
      </div>

      <main className='main-body'>
        <div className='form-container'>

          <div className='first-part'>
            <h1 className='head-1'>File Transfer</h1>
            <p>
              <strong>Welcome to File Transfer</strong>
              <br />
              <span>Sign up and start sending and receiving files.</span> 
            </p>
          </div>

          <form className='form-section' onSubmit={handlesubmit}> 
            <div className="input-group">
              <input
                type="email"
                id="email"
                name="email"
                required
                className="floating-input"
                placeholder=" "
                value={form.email}
                onChange={handleChange}

              />
              <label htmlFor="email" className="floating-label">Email</label>
              {errors.email && <p className="error-msg-1">{errors.email}</p>}
            </div>

            <div className="input-group">
              <input 
                  type="text" 
                  id="username"
                  name="username"
                  className="floating-input"
                  placeholder=" "
                  value={form.username}
                  onChange={handleChange}
                  
              />
              <label htmlFor="username" className="floating-label">User Name</label>
              {errors.username && <p className="error-msg-1">{errors.username}</p>}
            </div>

            <div className="input-group password-group">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="floating-input"
                placeholder=" "
                onChange={handleChange}
                value={form.password}

              />
              <label htmlFor="password" className="floating-label">Password</label>
              {errors.password && <p className="error-msg-1">{errors.password}</p>}

              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                👁️
              </span>
            </div>

            <button 
              type="submit" 
              className="continue-btn">
                Continue
            </button>

          </form>

          <p className="login-text">
            Already have an account?{" "}
            <Link to="/login" className="login-link">Login</Link>
          </p>


          <p className="terms-text">
            By creating an account, you agree to our{" "}
            <strong>Terms of Service</strong> and{" "}
            <strong>Privacy & Cookie Statement.</strong>
          </p>


        </div>
      </main>
      
      <footer className="foot">
        <p>© 2025 File Transfer. All rights reserved.</p>
      </footer>

>>>>>>> 04fb2379da1934556ec3b85d0fe981dff5f96871
    </div>
  );
};

export default Register;
