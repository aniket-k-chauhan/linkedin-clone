import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebaseConfig";
import Loader from "../components/common/Loader";
import ConnectionComponent from "../components/ConnectionComponent";

export default function Connection() {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (!res?.accessToken) {
        navigate("/");
      } else {
        setLoading(false);
      }
    });
  }, []);
  return loading ? <Loader /> : <ConnectionComponent />;
}
