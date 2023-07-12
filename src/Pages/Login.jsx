import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginComponent from "../components/LoginComponent";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebaseConfig";
import Loader from "../components/common/Loader";

export default function Login() {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (res?.accessToken) {
        navigate("/home");
      } else {
        setLoading(false);
      }
    });
  }, []);
  return loading ? <Loader /> : <LoginComponent />;
}
