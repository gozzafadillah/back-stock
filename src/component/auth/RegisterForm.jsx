import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CreateTableUser } from "../../config/Apollo/Mutation";
import { uuidv4 } from "@firebase/util";
import Cookies from "js-cookie";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";

const RegisterForm = (props) => {
  const [data, setData] = useState(props.data);
  const [user] = useAuthState(auth);
  const [CreateUser] = useMutation(CreateTableUser);
  const navigate = useNavigate();

  function onChangeHandler(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();

    props.registerWithEmailAndPassword(
      uuidv4(),
      data.name,
      data.email,
      data.password
    );
  }

  useEffect(() => {
    if (user) {
      CreateUser({
        variables: {
          objects: {
            id: Cookies.get("id"),
            email: data.email,
            name: data.name,
            password: data.password,
          },
        },
      });
      navigate("/login");
    }
  }, [user]);

  return (
    <div>
      <div className="register">
        <div className="register__container">
          <h1 style={{ textAlign: "center" }}>Register</h1>
          <input
            type="text"
            className="register__textBox"
            value={data?.email}
            name="email"
            onChange={onChangeHandler}
            placeholder="E-mail Address"
          />
          <input
            type="text"
            className="register__textBox"
            value={data?.name}
            name="name"
            onChange={onChangeHandler}
            placeholder="Full Name"
          />
          <input
            type="password"
            className="register__textBox"
            value={data?.password}
            name="password"
            onChange={onChangeHandler}
            placeholder="Password"
          />
          <Button
            type="primary"
            style={{ margin: "10px 0" }}
            onClick={(e) => handleSubmit(e)}
          >
            Register
          </Button>

          <div>
            have an account? <Link to="/login">login</Link> now.
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
