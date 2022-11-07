import { useMutation } from "@apollo/client";
import { uuidv4 } from "@firebase/util";
import { Button, Modal } from "antd";
import Cookies from "js-cookie";
import React from "react";
import { useState } from "react";
import { InsertDetailProduct } from "../../../config/Apollo/Mutation";
import Swal from "sweetalert2";

const ModalProduct = (props) => {
  const [product, setProduct] = useState({
    namaProduk: "",
    id: uuidv4(),
    harga: 0,
    qty: 0,
    categoryId: 0,
  });
  const [errorMessages, setErrorMessages] = useState({
    namaProduk: "",
    qty: 0,
    harga: 0,
  });

  const [modalProduct, setModalProduct] = useState(props.modalProduct);
  const [CreateDetail, { error: detailErr }] = useMutation(InsertDetailProduct);
  const regexName = /^[A-Za-z ]*$/;

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
    if (name === "qty") {
      if (value >= 0) {
        setErrorMessages({
          ...errorMessages,
          qty: "",
        });
      } else {
        setErrorMessages({
          ...errorMessages,
          qty: "Qty tidak boleh mines",
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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errorMessages.namaProduk && !errorMessages.qty) {
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
      if (detailErr) {
        Swal.fire({
          title: "Failed Added product",
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "Success Added product",
          icon: "success",
        });
      }

      setProduct({
        id: uuidv4(),
        namaProduk: "",
        categoryId: 0,
        qty: 0,
        harga: 0,
      });
      setErrorMessages({
        namaProduk: "",
        qty: 0,
        harga: 0,
      });

      document.getElementById("form-product").reset();
      setModalProduct(false);
    }
  };

  const reset = () => {
    setProduct({
      id: uuidv4(),
      namaProduk: "",
      categoryId: 0,
      qty: 0,
      harga: 0,
    });
    setErrorMessages({
      namaProduk: "",
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
        style={{
          maxWidth: "24rem",
        }}
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
          />
          {errorMessages.namaProduk ? (
            <p className="text-danger">{errorMessages.namaProduk}</p>
          ) : (
            ""
          )}
          <label htmlFor="qty">Quantity</label>
          <input type="number" onChange={onChangeHandler} name="qty" id="qty" />
          {errorMessages.qty ? (
            <p className="text-danger">{errorMessages.qty}</p>
          ) : (
            ""
          )}
          <label htmlFor="harga">Harga</label>
          <input
            type="number"
            onChange={onChangeHandler}
            name="harga"
            id="harga"
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

export default ModalProduct;
