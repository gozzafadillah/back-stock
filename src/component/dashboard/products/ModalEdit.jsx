import { Button, Modal } from "antd";
import React, { useState } from "react";
import { GetProductById } from "../../../config/Apollo/Query";
import { uuidv4 } from "@firebase/util";
import { useMutation, useQuery } from "@apollo/client";
import { EditProduct } from "../../../config/Apollo/Mutation";

const ModalEdit = (props) => {
  const [modalProduct, setModalProduct] = useState(props.modalProduct);
  const [UpdateProduct, { error: updatePorductErr }] = useMutation(EditProduct);

  const { data: dataProductById } = useQuery(GetProductById, {
    variables: {
      id: props.id,
    },
  });

  if (updatePorductErr) {
    alert("error, ", updatePorductErr);
  }

  const [product, setProduct] = useState({
    namaProduk: "",
    id: uuidv4(),
    harga: 0,
  });

  function showProduct() {
    setModalProduct(true);
  }

  function onChangeHandler(e) {
    setProduct({ ...product, [e.target.name]: e.target.value });
    console.log({ e });
  }
  function handleSubmit(e) {
    e.preventDefault();
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
  }

  function reset() {
    setProduct({
      namaProduk: "",
      id: uuidv4(),
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
            value={dataProductById?.product_by_pk.categoryId}
            disabled
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
            placeholder={dataProductById?.product_by_pk.namaProduk}
          />
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
        </form>
      </Modal>
    </>
  );
};

export default ModalEdit;
