import { Col, Row } from "antd";
import moment from "moment/moment";
import React from "react";
import TableDetailList from "./TableDetailList";

const TableDashboard = (props) => {
  return (
    <>
      <Row gutter={16} style={{ justifyContent: "center" }}>
        <Col span={10} style={{ display: "flex", flexDirection: "column" }}>
          <h1>History</h1>
          <table border="1">
            <thead>
              <tr>
                <th style={{ padding: "5px" }}>Product</th>
                <th>Status</th>
                <th>qty</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {props.subDataDetail?.detail_product.map((val) => {
                val.createdAt = moment(val.createdAt)
                  .subtract(10, "days")
                  .calendar();

                return <TableDetailList key={val.id} data={val} />;
              })}
            </tbody>
          </table>
        </Col>
      </Row>
    </>
  );
};

export default TableDashboard;
