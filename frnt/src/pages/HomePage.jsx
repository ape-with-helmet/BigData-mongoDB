import React from 'react';
import "./HomePage.css";
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  function goto(path) {
    navigate(path);
  }

  return (
    <div>
      <div className="homepage-container">
        <div className="homepage-maintext">
          <h1 className='homepage-text'>Welcome to WanderWay</h1>
        </div>
        <div className="login-box">
          <div className="login-option" onClick={() => goto("/login")}>
            Login
          </div>
          <div className="signup-option" onClick={() => goto("/signup")}>
            Sign-up
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
