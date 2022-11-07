import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CreateTableUser } from "../../config/Apollo/Mutation";
import { uuidv4 } from "@firebase/util";
import Cookies from "js-cookie";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";
import { EyeOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";

const RegisterForm = (props) => {
  const [data, setData] = useState(props.data);
  const [user] = useAuthState(auth);
  const [CreateUser] = useMutation(CreateTableUser);
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState({
    password: "",
    name: "",
    email: "",
  });
  const regexEmail =
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;
  const regexName = /^[A-Za-z ]*$/;
  const emailPattern = new RegExp(regexEmail);

  const [show, setShow] = useState(false);

  function onChangeHandler(e) {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;

    setData({ ...data, [e.target.name]: e.target.value });
    if (name === "name") {
      if (regexName.test(value)) {
        setErrorMessages({
          ...errorMessages,
          name: "",
        });
      } else {
        setErrorMessages({
          ...errorMessages,
          name: "Nama harus berupa huruf",
        });
      }
    }
    if (name === "email") {
      if (emailPattern.test(value)) {
        setErrorMessages({
          ...errorMessages,
          email: "",
        });
      } else {
        setErrorMessages({
          ...errorMessages,
          email: "Format email tidak sesuai",
        });
      }
    }
    if (name === "password") {
      if (data.password.length > 7 && data.password.length < 15) {
        setErrorMessages({
          ...errorMessages,
          password: "",
        });
      } else {
        setErrorMessages({
          ...errorMessages,
          password: "Password minimal 8 character",
        });
      }
    }
  }
  function handleSubmit(e) {
    e.preventDefault();

    if (!errorMessages.email && !errorMessages.password) {
      props.registerWithEmailAndPassword(
        uuidv4(),
        data.name,
        data.email,
        data.password
      );
      Swal.fire({
        icon: "success",
        title: "you has been register",
      });
    }
  }

  function handleShow() {
    if (show === true) {
      setShow(false);
    } else {
      setShow(true);
    }
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
            id="email"
            onChange={onChangeHandler}
            placeholder="E-mail Address"
          />
          {errorMessages.email ? (
            <p className="text-danger">{errorMessages.email}</p>
          ) : (
            ""
          )}
          <input
            type="text"
            className="register__textBox"
            value={data?.name}
            name="name"
            id="name"
            onChange={onChangeHandler}
            placeholder="Full Name"
          />
          {errorMessages.name ? (
            <p className="text-danger">{errorMessages.name}</p>
          ) : (
            ""
          )}
          <div style={{ display: "flex", flexDirection: "row" }}>
            <input
              type={!show ? "text" : "password"}
              className="register__textBox"
              value={data?.password}
              name="password"
              id="password"
              onChange={onChangeHandler}
              placeholder="Password"
            />
            <button
              onClick={handleShow}
              style={{
                height: "50%",
                border: "none",
                alignSelf: "center",
                backgroundColor: "transparent",
              }}
            >
              <EyeOutlined />
            </button>
          </div>
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
