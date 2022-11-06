import { useSubscription } from "@apollo/client";
import { Breadcrumb, Card, Col, Row } from "antd";
import Cookies from "js-cookie";
import React from "react";
import {
  HistoryProductByTokoId,
  HistoryToko,
} from "../../config/Apollo/Subscription";
import TableDashboard from "./TableDashboard";

const Main = () => {
  const {
    data: subDataProduct,
    loading: loadingProductSub,
    error: subDataErr,
  } = useSubscription(HistoryProductByTokoId, {
    variables: {
      tokoId: Cookies.get("tokoId"),
    },
  });
  const { data: subDataDetail, error: subDetailErr } = useSubscription(
    HistoryToko,
    {
      variables: {
        tokoId: Cookies.get("tokoId"),
      },
    }
  );

  return (
    <>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
      >
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
      </Breadcrumb>
      <div
        className="site-layout-background"
        style={{
          padding: 24,
          minHeight: 180,
        }}
      >
        <div className="site-card-wrapper">
          <Row style={{ justifyContent: "center" }} gutter={8}>
            <Col span={4}>
              <Card
                style={{ backgroundColor: "#D3e4e4", height: "8rem" }}
                title="Products"
                bordered={true}
              >
                <h3 style={{ fontWeight: "bold" }}>0</h3>
              </Card>
            </Col>
            <Col span={4}>
              <Card
                style={{ backgroundColor: "#D3e4e4", height: "8rem" }}
                title="Stock"
                bordered={true}
              >
                <h3 style={{ fontWeight: "bold" }}>0</h3>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
      <div
        className="site-layout-background"
        style={{
          padding: 24,
          minHeight: 160,
        }}
      >
        {subDataErr || subDetailErr ? (
          <div>Data Kosong</div>
        ) : (
          <TableDashboard
            subDataProduct={subDataProduct}
            subDataDetail={subDataDetail}
          />
        )}
      </div>
    </>
  );
};

export default Main;
