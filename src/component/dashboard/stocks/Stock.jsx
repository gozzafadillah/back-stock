import { useMutation, useSubscription } from "@apollo/client";
import { Breadcrumb, Button, Card, Col, Row } from "antd";
import Cookies from "js-cookie";
import React, { useState } from "react";
import {
  insertDetailProductOne,
  UpdateQtyProduct,
} from "../../../config/Apollo/Mutation";
import { HistoryProductByTokoId } from "../../../config/Apollo/Subscription";

const Stock = () => {
  const [data, setData] = useState({
    qty: 0,
  });
  const { data: dataProduct } = useSubscription(HistoryProductByTokoId, {
    variables: {
      tokoId: Cookies.get("tokoId"),
    },
  });
  const [updateProductQty, { error: updateProductErr }] =
    useMutation(UpdateQtyProduct);
  const [CreateDetail, { error: createDetailErr }] = useMutation(
    insertDetailProductOne
  );
  console.log([updateProductErr, createDetailErr]);

  function handleOnchange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  function handleAdd(e, id, qty) {
    e.preventDefault();

    let oldQty = qty;
    let totalQty = 1 * oldQty + 1 * data.qty;
    updateProductQty({
      variables: {
        id: id,
        qty: totalQty,
      },
    });
    CreateDetail({
      variables: {
        object: {
          tokoId: Cookies.get("tokoId"),
          produkId: id,
          qty: totalQty,
          status: "Masuk",
        },
      },
    });
  }
  function handleIncrease(e, id, qty) {
    e.preventDefault();

    let oldQty = qty;
    let totalQty = 1 * oldQty - 1 * data.qty;
    updateProductQty({
      variables: {
        id: id,
        qty: totalQty,
      },
    });
    CreateDetail({
      variables: {
        object: {
          tokoId: Cookies.get("tokoId"),
          produkId: id,
          qty: totalQty,
          status: "Keluar",
        },
      },
    });
    console.log(id);
  }

  return (
    <div>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
      >
        <Breadcrumb.Item>Stock</Breadcrumb.Item>
      </Breadcrumb>
      <div
        className="site-layout-background"
        style={{
          padding: 20,
          minHeight: 180,
        }}
      >
        <div className="site-card-wrapper"></div>
        <h3 style={{ paddingBottom: "20px" }}>Stock Product Anda</h3>
        <Row
          gutter={[24, 16]}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {dataProduct?.product.map((product) => (
            <Col span={6}>
              <Card
                key={product.id}
                size="small"
                title={product.namaProduk}
                style={{
                  width: 180,
                  backgroundColor: "#d6d0d0",
                }}
              >
                <p>Qty</p>
                <p>{product.qty}</p>
                <p>
                  <input
                    style={{ width: "55px" }}
                    type="number"
                    name="qty"
                    id="qty"
                    onChange={handleOnchange}
                    placeholder={product.qty}
                  />
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <Button
                    onClick={(e) => handleAdd(e, product.id, product.qty)}
                    style={{ margin: "0 2px" }}
                  >
                    Tambah
                  </Button>
                  <Button
                    onClick={(e) => handleIncrease(e, product.id, product.qty)}
                    style={{ margin: "0 2px" }}
                  >
                    Kurang
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Stock;
