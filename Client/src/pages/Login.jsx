// import React,{useState} from 'react';
import Logo from '../components/Logo';
import search from '../assets/search.svg'
import '../styles/Login.css'
import HideIcon from '../assets/hide-icon.png'; 
import ShowIcon from '../assets/show-icon.png';

import { useNavigate } from 'react-router-dom';


const Register = () => {
  
  const navigate= useNavigate();
  
  function handleLogin(){
    navigate('/login');
  }
  function handleSignUp(){
    navigate('/');
  }

  return (
    <div className="Login-container">
      <div className='header-nav'>
        <Logo />
        <div className='login-signup'>
          <div className='search'>
            <img src={search} alt='search-logo' className='sea'/>
            <p className='input-search'>Search </p>
          </div>
          <div className='drop-box'>
            <select>
              <option>English(united states)</option>
              <option>Japan</option>
              <option>India</option>
            </select>
          </div>
          <div>
            <button className='btn-1' onClick={handleLogin} >Login</button>
          </div>
          <div>
            <button className='btn-2' onClick={handleSignUp}>Sign Up</button>
          </div>
        </div>
      </div>
      <hr />

      {/* This is Login part */}
      <div className='password-container-login'>
        
        <form action="/home" className='login-form'>
          <h1>Log In</h1>
          <p className="signup-text">New to Transfer File? <a href="/">Sign up for free</a></p>

          <div className='username'>
            <label htmlFor="gmail-id">Email Address</label>
            <input type="gmail" className='gml' id='gmail-id'/>
          </div>
          
          <div className='user-password'>
            <label htmlFor="password-id">Password</label>
            <input type="password" className='pss' id='password-id'/>
          </div>
          
          <a href="#" className="forgot-password">Forgot password?</a>
          <button type="submit" className="login-btn">Log in</button>

        </form>
        
      </div>

    </div>
  );
};

export default Register;
