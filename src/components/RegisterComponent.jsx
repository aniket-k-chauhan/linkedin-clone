import React, { useState } from "react";
import GoogleButton from "react-google-button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { postUserData } from "../api/FirestoreAPI";
import LinkedinLogo from "../assets/linkedinLogo.png";
import { RegisterAPI, GoogleSignInAPI } from "../api/AuthAPI";
import "../Sass/LoginComponent.scss";

export default function RegisterComponent() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({});

  const register = async () => {
    try {
      const res = await RegisterAPI(credentials.email, credentials.password);
      toast.success("Account Created!");
      postUserData({
        name: credentials.name,
        email: credentials.email,
      });
      localStorage.setItem("userEmail", res.user.email);
      navigate("/home");
    } catch (err) {
      console.log(err);
      toast.error("Cannot create your Account");
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
        <h1 className="heading">Make the most of your professional life</h1>

        <div className="auth-inputs">
          <input
            className="common-input"
            type="text"
            placeholder="Your Name"
            onChange={(event) =>
              setCredentials({ ...credentials, name: event.target.value })
            }
          />
          <input
            className="common-input"
            type="email"
            placeholder="Email or phone number"
            onChange={(event) =>
              setCredentials({ ...credentials, email: event.target.value })
            }
          />
          <input
            className="common-input"
            type="password"
            placeholder="Password (6 or more characters)"
            onChange={(event) =>
              setCredentials({ ...credentials, password: event.target.value })
            }
          />
        </div>
        <button className="login-btn" onClick={register}>
          Agree & Join
        </button>
      </div>
      <hr className="hr-text" data-content="or" />
      <div className="google-btn-container">
        <GoogleButton className="google-btn" onClick={googleSignIn} />
        <p className="go-to-signup">
          Already on LinkedIn?{" "}
          <span className="join-now" onClick={() => navigate("/")}>
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}
