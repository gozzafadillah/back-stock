import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import "../assets/css/Login.css";

import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
} from "../config/firebase";
import { useMutation } from "@apollo/client";
import { CreateTableUser } from "../config/Apollo/Mutation";
import { uuidv4 } from "@firebase/util";
import LoginForm from "../component/auth/LoginForm";

function Login() {
  const [user, loading] = useAuthState(auth);
  const [CreateUser, { errorCreateUser }] = useMutation(CreateTableUser);
  const navigate = useNavigate();

  const handleClick = (email, password) => {
    logInWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    if (loading) {
      // loading
      return;
    }

    if (user || errorCreateUser) {
      if (user) {
        navigate("/dashboard");
      }
      CreateUser({
        variables: {
          objects: {
            id: user.uid,
            email: user.email,
            name: user.displayName,
            password: uuidv4(),
            tokoId: null,
          },
        },
      });
      console.clear();

      localStorage.setItem("uid", user.uid);
      navigate("/dashboard");
    }
  }, [user, loading]);
  return (
    <LoginForm handleClick={handleClick} signInWithGoogle={signInWithGoogle} />
  );
}
export default Login;
