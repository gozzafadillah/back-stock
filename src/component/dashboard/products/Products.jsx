import { Breadcrumb, Button } from "antd";
import React, { useState } from "react";
import ModalProduct from "./ModalProduct";
import { useMutation, useSubscription } from "@apollo/client";
import { HistoryProductByTokoId } from "../../../config/Apollo/Subscription";
import Cookies from "js-cookie";
import { DestroyProduct } from "../../../config/Apollo/Mutation";
import "../../../assets/css/products.css";
import ModalEdit from "./ModalEdit";
import Swal from "sweetalert2";

const Products = () => {
  const [modalProduct] = useState(false);
  const [DeleteProduct, { error: errDeleted }] = useMutation(DestroyProduct);

  const hapus = (id) => {
    DeleteProduct({
      variables: {
        id: id,
      },
    });
    if (errDeleted) {
      Swal.fire({
        title: "Failed delete product",
        icon: "error",
      });
    } else {
      Swal.fire({
        title: "Success delete product",
        icon: "success",
      });
    }
  };

  const { data: dataProduct } = useSubscription(HistoryProductByTokoId, {
    variables: {
      tokoId: Cookies.get("tokoId"),
    },
  });

  return (
    <div>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
      >
        <Breadcrumb.Item>Products</Breadcrumb.Item>
      </Breadcrumb>
      <div
        className="site-layout-background"
        style={{
          padding: 20,
          minHeight: 180,
        }}
      >
        <div className="site-card-wrapper" style={{}}>
          <ModalProduct data={dataProduct} modalProduct={modalProduct} />
          <table>
            <thead>
              <tr>
                <th>Produk</th>
                <th>Harga</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {dataProduct?.product.map((data) => (
                <tr key={data.id}>
                  <td>{data.namaProduk}</td>
                  <td>Rp {data.harga}</td>
                  <td>{data.qty}</td>
                  <td>
                    <ModalEdit modalProduct={modalProduct} id={data.id} />
                    <Button onClick={() => hapus(data.id)} type="danger">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;
