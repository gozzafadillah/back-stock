import { useMutation } from "@apollo/client";
import { uuidv4 } from "@firebase/util";
import { Button, Modal } from "antd";
import Cookies from "js-cookie";
import React from "react";
import { useState } from "react";
import { InsertDetailProduct } from "../../../config/Apollo/Mutation";

const ModalProduct = (props) => {
  const [product, setProduct] = useState({
    namaProduk: "",
    id: uuidv4(),
    harga: 0,
    qty: 0,
    categoryId: 0,
  });
  const [modalProduct, setModalProduct] = useState(props.modalProduct);
  const [CreateDetail, { data: detailProduct }] =
    useMutation(InsertDetailProduct);

  function onChangeHandler(e) {
    setProduct({ ...product, [e.target.name]: e.target.value });
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    CreateDetail({
      variables: {
        objects: {
          product: {
            data: {
              id: product.id,
              namaProduk: product.namaProduk,
              qty: product.qty,
              harga: product.harga,
              categoryId: product.categoryId,
            },
          },
          qty: product.qty,
          status: "Masuk",
          tokoId: Cookies.get("tokoId"),
        },
      },
    });

    console.log([detailProduct]);

    setProduct({
      id: uuidv4(),
      namaProduk: "",
      categoryId: 0,
      qty: 0,
      harga: 0,
    });

    document.getElementById("form-product").reset();
    setModalProduct(false);
  };

  const reset = () => {
    setProduct({
      id: uuidv4(),
      namaProduk: "",
      categoryId: 0,
      qty: 0,
      harga: 0,
    });
    document.getElementById("form-product").reset();
    setModalProduct(false);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "end", padding: "20px" }}>
        <Button
          type="primary"
          onClick={() => {
            setModalProduct(true);
          }}
        >
          +
        </Button>
      </div>
      <Modal
        title="Vertically centered modal dialog"
        centered
        visible={modalProduct}
        onOk={(e) => handleSubmit(e)}
        onCancel={() => reset()}
      >
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "18rem",
            justifyContent: "center",
          }}
          id="form-product"
        >
          <label htmlFor="category">Category</label>
          <select
            onChange={onChangeHandler}
            style={{ with: "240" }}
            name="categoryId"
            id="categoryId"
          >
            <option value="0">option</option>
            <option value="1">Pangan</option>
            <option value="2">Kebutuhan Rumah Tangga</option>
            <option value="3">Makanan</option>
          </select>
          <label htmlFor="namaProduk">Nama</label>
          <input
            type="text"
            onChange={onChangeHandler}
            name="namaProduk"
            id="namaProduk"
          />
          <label htmlFor="qty">Quantity</label>
          <input type="number" onChange={onChangeHandler} name="qty" id="qty" />
          <label htmlFor="qty">Harga</label>
          <input
            type="number"
            onChange={onChangeHandler}
            name="harga"
            id="harga"
          />
        </form>
      </Modal>
    </>
  );
};

export default ModalProduct;
