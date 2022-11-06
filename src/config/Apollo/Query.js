import { gql } from "@apollo/client";

const GetUserById = gql`
  query GetUser($id: String = "") {
    users(where: { id: { _eq: $id } }) {
      email
      id
      name
      password
      toko {
        id
        image
        namaToko
      }
    }
  }
`;

const GetProductById = gql`
  query GetProduct($id: String!) {
    product_by_pk(id: $id) {
      namaProduk
      harga
      qty
      categoryId
    }
  }
`;

export { GetUserById, GetProductById };
