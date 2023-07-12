import React, { useState } from "react";
import GoogleButton from "react-google-button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { LoginAPI, GoogleSignInAPI } from "../api/AuthAPI";
import LinkedinLogo from "../assets/linkedinLogo.png";
import "../Sass/LoginComponent.scss";

export default function LoginComponent() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({});

  const login = async () => {
    try {
      const res = await LoginAPI(credentials.email, credentials.password);
      toast.success("Signed in to LinkedIn");
      localStorage.setItem("userEmail", res.user.email);
      navigate("/home");
    } catch (err) {
      console.log(err);
      toast.error("Please check your Credentials");
    }
  };

  const googleSignIn = () => {
    // try {
    const res = GoogleSignInAPI();
    navigate("/home");
    // } catch (err) {
    //   console.log(err);
    // }
  };

  return (
    <div className="login-wrapper">
      <img className="linkedinLogo" src={LinkedinLogo} />
      <div className="login-wrapper-inner">
        <h1 className="heading">Sign in</h1>
        <p className="sub-heading">Stay updated on your professional world</p>

        <div className="auth-inputs">
          <input
            className="common-input"
            type="email"
            placeholder="Email or Phone"
            onChange={(event) =>
              setCredentials({ ...credentials, email: event.target.value })
            }
          />
          <input
            className="common-input"
            type="password"
            placeholder="Password"
            onChange={(event) =>
              setCredentials({ ...credentials, password: event.target.value })
            }
          />
        </div>
        <button className="login-btn" onClick={login}>
          Sign in
        </button>
      </div>
      <hr className="hr-text" data-content="or" />
      <div className="google-btn-container">
        <GoogleButton className="google-btn" onClick={googleSignIn} />
        <p className="go-to-signup">
          New to LinkedIn?{" "}
          <span className="join-now" onClick={() => navigate("/register")}>
            Join now
          </span>
        </p>
      </div>
    </div>
  );
}
