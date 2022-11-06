import React from "react";

const TableDetailList = (props) => {
  console.log(props);
  return (
    <tr>
      <td style={{ padding: "10px" }}>{props.data?.product?.namaProduk}</td>
      <td>{props.data?.status}</td>
      <td>{props.data?.product?.qty}</td>
      <td>{props.data?.createdAt}</td>
    </tr>
  );
};

export default TableDetailList;
