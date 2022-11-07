import React from "react";
import "../assets/css/register.css";
import RegisterForm from "../component/auth/RegisterForm";
import { registerWithEmailAndPassword } from "../config/firebase";

function Register() {
  const data = {
    id: "",
    name: "",
    email: "",
    password: "",
  };

  return (
    <RegisterForm
      data={data}
      registerWithEmailAndPassword={registerWithEmailAndPassword}
    />
  );
}
export default Register;
