import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { storage } from "../config/firebase";
import "../assets/css/register.css";
import { useMutation, useQuery } from "@apollo/client";
import { uuidv4 } from "@firebase/util";
import { useNavigate } from "react-router-dom";
import {
  InsertTokoUser,
  UpdateStatusTokoUser,
} from "../config/Apollo/Mutation";
import Cookies from "js-cookie";
import { GetUserById } from "../config/Apollo/Query";

const RegisterStore = () => {
  const [imgUrl, setImgUrl] = useState("");
  const DataStore = {
    id: uuidv4(),
    namaToko: "",
    alamat: "",
    image: "",
  };

  const [data, setData] = useState(DataStore);
  const [progresspercent, setProgresspercent] = useState(0);
  const { data: dataUser } = useQuery(GetUserById, {
    variables: {
      id: Cookies.get("id"),
    },
  });

  const [InsertToko, { error: errorTokoUser }] = useMutation(InsertTokoUser);

  const [ChangeStatUserToko, { data: updateUser, error: errorChangeStat }] =
    useMutation(UpdateStatusTokoUser);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const file = e.target[2]?.files[0];
    if (!file) return;

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
          InsertToko({
            variables: {
              userId: Cookies.get("id"),
              objects: {
                id: data.id,
                namaToko: data.namaToko,
                alamat: data.alamat,
                image: downloadURL,
              },
            },
          });
          ChangeStatUserToko({
            variables: {
              id: Cookies.get("id"),
              tokoId: data.id,
            },
          });
        });
      }
    );

    Cookies.set("tokoId", data.id);
  };

  function onChangeHandler(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    console.log([[errorChangeStat, errorTokoUser]]);
  }, [errorChangeStat, errorTokoUser]);

  useEffect(() => {
    if (updateUser?.update_users.returning) {
      navigate("../dashboard");
    }
  }, [updateUser]);

  return (
    <div className="register">
      <div className="register__container">
        <h1 style={{ textAlign: "center" }}>Register Store</h1>

        <form
          onSubmit={(e) => handleSubmit(e)}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <input
            type="text"
            className="register__textBox"
            value={data.namaToko}
            placeholder="nama usaha"
            name="namaToko"
            id="namaToko"
            onChange={onChangeHandler}
          />
          <textarea
            className="register__textBox"
            value={data.alamat}
            placeholder="alamat"
            name="alamat"
            id="alamat"
            onChange={onChangeHandler}
          />
          <input
            type="file"
            className="register__textBox"
            value={data.image}
            placeholder="img"
            name="image"
            id="image"
            onChange={onChangeHandler}
          />
          {!imgUrl && (
            <div className="outerbar">
              <div
                className="innerbar"
                style={{ width: `${progresspercent}%` }}
              >
                {progresspercent}%
              </div>
            </div>
          )}
          {imgUrl && <img src={imgUrl} alt="uploaded file" height={200} />}
          <button type="submit" style={{ margin: "10px 0" }}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterStore;
