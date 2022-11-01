import { Space, Table, Tag } from "antd";
import React from "react";

const TableDashboard = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Qty",
      dataIndex: "qty",
      key: "qty",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      qty: 32,
    },
    {
      key: "2",
      name: "Jim Green",
      qty: 42,
    },
    {
      key: "3",
      name: "Joe Black",
      qty: 32,
    },
  ];
  return (
    <div>
      <h1>Product</h1>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default TableDashboard;
