import React from "react";

const TableDetailList = (props) => {
  return (
    <tr>
      <td style={{ padding: "10px" }}>{props.data?.product?.namaProduk}</td>
      <td>{props.data?.status}</td>
      <td>{props.data?.qty}</td>
      <td>{props.data?.createdAt}</td>
    </tr>
  );
};

export default TableDetailList;
