import { Breadcrumb, Button, Card } from "antd";
import React from "react";

const Stock = () => {
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
        <Card
          size="small"
          title="Beras Cianjur"
          style={{
            width: 180,
            backgroundColor: "#d6d0d0",
          }}
        >
          <p>Qty</p>
          <p>0</p>
          <p>
            <input
              style={{ width: "35px" }}
              type="number"
              name="qty"
              id="qty"
              placeholder="0"
            />
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <Button style={{ margin: "0 2px" }}>Tambah</Button>
            <Button style={{ margin: "0 2px" }}>Kurang</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Stock;
