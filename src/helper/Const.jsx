import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";

const columnProducts = [
  {
    title: "Nama Produk",
    dataIndex: "namaProduk",
    key: "namaProduk",
    render: (text) => <div style={{ fontWeight: "bolder" }}>{text}</div>,
  },
  {
    title: "Harga",
    dataIndex: "harga",
    key: "harga",
  },
  {
    title: "Qty",
    dataIndex: "qty",
    key: "qty",
  },
];
const dataProducts = [
  {
    key: "1",
    name: "Pampers Mami Kaka",
    category: "Kebutuhan Rumah Tangga",
    qty: 32,
  },
  {
    key: "2",
    name: "Bimoil",
    category: "Pangan",
    qty: 12,
  },
  {
    key: "3",
    name: "Bulog Cianjur",
    category: "Pangan",
    qty: 50,
  },
];
const columnHistory = [
  {
    title: "namaProduct",
    dataIndex: "detailProduct",
    key: "detailProduct",
    render: (text) => <div>{text}</div>,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Qty",
    dataIndex: "qty",
    key: "qty",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
];
const dataHistory = [
  {
    key: "1",
    name: "Pampers Mami Kaka",
    status: <CaretUpOutlined style={{ color: "green" }} />,
    qty: 32,
    date: "Minggu, 23 September 2022",
  },
  {
    key: "2",
    name: "Bimoil",
    status: <CaretDownOutlined style={{ color: "red" }} />,
    qty: 8,
    date: "Minggu, 23 September 2022",
  },
  {
    key: "3",
    name: "Bulog Cianjur",
    status: <CaretUpOutlined style={{ color: "green" }} />,
    qty: 50,
    date: "Minggu, 23 September 2022",
  },
];

export { dataProducts, columnProducts, columnHistory, dataHistory };
