import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout, storage } from "../config/firebase";
import "../assets/css/register.css";
import { useMutation, useQuery } from "@apollo/client";
import { GetUserById } from "../config/Apollo/Query";
import { uuidv4 } from "@firebase/util";
import { useNavigate } from "react-router-dom";
import {
  InsertTokoUser,
  UpdateStatusTokoUser,
} from "../config/Apollo/Mutation";

const DataStore = {
  id: uuidv4(),
  namaToko: "",
  alamat: "",
  imgProfile: "",
};

const RegisterStore = () => {
  const [data, setData] = useState(DataStore);
  const [user, loading, error] = useAuthState(auth);

  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);

  const [InsertToko, { errorTokoUser }] = useMutation(InsertTokoUser);

  const [ChangeStatUserToko, { error: errorUpdateStatUser }] =
    useMutation(UpdateStatusTokoUser);
  const { data: dataUser } = useQuery(GetUserById, {
    variables: {
      id: localStorage.getItem("uid"),
    },
  });

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
        });
      }
    );

    const newData = {
      id: data.id,
      namaToko: data.namaToko,
      alamat: data.alamat,
      imgProfile: imgUrl,
    };

    InsertToko({
      variables: {
        userId: localStorage.getItem("uid"),
        objects: {
          id: newData.id,
          namaToko: newData.namaToko,
          alamat: newData.alamat,
          image: newData.imgProfile,
          userID: localStorage.getItem("uid"),
        },
      },
    });

    ChangeStatUserToko({
      variables: {
        id: localStorage.getItem("uid"),
        tokoId: newData.id,
      },
    });
  };

  function onChangeHandler(e) {
    console.log({ e });
    setData({ ...data, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    console.log({ user, loading, error, errorTokoUser, errorUpdateStatUser });
  }, [user, loading, error]);

  useEffect(() => {
    if (imgUrl !== null) {
      if (dataUser?.users[0].tokoId !== null) navigate("../dashboard");
    }
  }, [imgUrl]);

  return (
    <div className="register">
      <div className="register__container">
        <h1 style={{ textAlign: "center" }}>Register Store</h1>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <input
            type="text"
            className="register__textBox"
            value={data.namaToko}
            placeholder="nama usaha"
            name="namaToko"
            onChange={onChangeHandler}
          />
          <textarea
            className="register__textBox"
            value={data.alamat}
            placeholder="alamat"
            name="alamat"
            onChange={onChangeHandler}
          />
          <input
            type="file"
            className="register__textBox"
            value={data.imgProfile}
            placeholder="img"
            name="imgProfile"
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
          <button onClick={logout}>logout</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterStore;
