import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";
import { auth, registerWithEmailAndPassword } from "../config/firebase";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    console.log({ user, loading, error });
  }, [user, loading, error]);
  return (
    <div className="login">
      <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="text"
          className="login__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="login__btn"
          onClick={() => registerWithEmailAndPassword(name, email, password)}
        >
          Register
        </button>

        <div>
          have an account? <Link to="/login">Login</Link> now.
        </div>
      </div>
    </div>
  );
}
export default Register;
