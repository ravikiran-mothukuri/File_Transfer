import React, { useState } from "react";
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

  }

  return (
    <div className="registration-container">

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

    </div>
  );
};

export default Register;
