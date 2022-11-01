import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import "../assets/css/register.css";
import { auth, registerWithEmailAndPassword } from "../config/firebase";
import { CreateTableUser } from "../config/Apollo/Mutation";
import { useMutation } from "@apollo/client";
import RegisterForm from "../component/auth/RegisterForm";

function Register() {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const data = {
    id: "",
    name: "",
    email: "",
    password: "",
  };
  const [CreateUser, { data: dataUser }] = useMutation(CreateTableUser);

  useEffect(() => {
    console.log({ user, loading, error, dataUser });
    if (user) {
      let bcrypt = require("bcryptjs");
      let salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(data.password, salt);
      data.password = hash;

      CreateUser({
        variables: {
          objects: {
            id: user.uid,
            email: data.email,
            name: data.name,
            password: data.password,
          },
        },
      });
      if (user) navigate("/login");
    }
  }, [user, loading]);
  return (
    <RegisterForm
      data={data}
      registerWithEmailAndPassword={registerWithEmailAndPassword}
    />
  );
}
export default Register;
