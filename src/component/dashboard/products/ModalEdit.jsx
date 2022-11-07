import { Button, Modal } from "antd";
import React, { useState } from "react";
import { GetProductById } from "../../../config/Apollo/Query";
import { uuidv4 } from "@firebase/util";
import { useMutation, useQuery } from "@apollo/client";
import { EditProduct } from "../../../config/Apollo/Mutation";
import Swal from "sweetalert2";

const ModalEdit = (props) => {
  const [modalProduct, setModalProduct] = useState(props.modalProduct);
  const [UpdateProduct, { error: updatePorductErr }] = useMutation(EditProduct);
  const [errorMessages, setErrorMessages] = useState({
    namaProduk: "",
    harga: 0,
  });
  const regexName = /^[A-Za-z ]*$/;

  const { data: dataProductById } = useQuery(GetProductById, {
    variables: {
      id: props.id,
    },
  });

  const [product, setProduct] = useState({
    namaProduk: "",
    id: uuidv4(),
    harga: 0,
  });

  function showProduct() {
    setModalProduct(true);
  }

  function onChangeHandler(e) {
    const name = e.target.name;
    const value = e.target.value;
    setProduct({ ...product, [e.target.name]: e.target.value });
    if (name === "namaProduk") {
      if (regexName.test(value)) {
        setErrorMessages({
          ...errorMessages,
          namaProduk: "",
        });
      } else {
        setErrorMessages({
          ...errorMessages,
          namaProduk: "Nama produk harus berupa huruf",
        });
      }
    }
    if (name === "harga") {
      if (value >= 0) {
        setErrorMessages({
          ...errorMessages,
          harga: "",
        });
      } else {
        setErrorMessages({
          ...errorMessages,
          harga: "Harga tidak boleh mines",
        });
      }
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!errorMessages.harga && !errorMessages.namaProduk) {
      UpdateProduct({
        variables: {
          id: props.id,
          harga: product.harga,
          namaProduk: product.namaProduk,
        },
      });
      setProduct({
        namaProduk: "",
        id: uuidv4(),
        harga: 0,
      });
      document.getElementById("form-product").reset();
      setModalProduct(false);

      setErrorMessages({
        namaProduk: "",
        harga: 0,
      });

      if (updatePorductErr) {
        Swal.fire({
          title: "Failed update product",
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "Success update product",
          icon: "success",
        });
      }
    }
  }

  function reset() {
    setProduct({
      namaProduk: "",
      id: uuidv4(),
      harga: 0,
    });
    setErrorMessages({
      namaProduk: "",
      harga: 0,
    });
    document.getElementById("form-product").reset();
    setModalProduct(false);
  }

  return (
    <>
      <Button onClick={() => showProduct()}>Edit</Button>
      <Modal
        title="Vertically centered modal dialog"
        centered
        visible={modalProduct}
        onOk={(e) => handleSubmit(e)}
        onCancel={() => reset()}
        style={{
          maxWidth: "24rem",
        }}
      >
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "18rem",
          }}
          id="form-product"
        >
          <label htmlFor="category">Category</label>
          <select
            onChange={onChangeHandler}
            style={{ with: "240" }}
            name="categoryId"
            id="categoryId"
            value={dataProductById?.product_by_pk.categoryId}
            disabled
          >
            <option value="0">Option</option>
            <option value="1">Pangan</option>
            <option value="2">Kebutuhan Rumah Tangga</option>
          </select>
          <label htmlFor="namaProduk">Nama</label>
          <input
            type="text"
            onChange={onChangeHandler}
            name="namaProduk"
            id="namaProduk"
            placeholder={dataProductById?.product_by_pk.namaProduk}
          />
          {errorMessages.namaProduk ? (
            <p className="text-danger">{errorMessages.namaProduk}</p>
          ) : (
            ""
          )}
          <label htmlFor="qty">Quantity</label>
          <input
            type="number"
            onChange={onChangeHandler}
            name="qty"
            id="qty"
            disabled
            placeholder={dataProductById?.product_by_pk.qty}
          />
          <label htmlFor="harga">Harga</label>
          <input
            type="number"
            onChange={onChangeHandler}
            name="harga"
            id="harga"
            placeholder={dataProductById?.product_by_pk.harga}
          />
          {errorMessages.harga ? (
            <p className="text-danger">{errorMessages.harga}</p>
          ) : (
            ""
          )}
        </form>
      </Modal>
    </>
  );
};

export default ModalEdit;
