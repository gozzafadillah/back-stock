import { gql } from "@apollo/client";

const InsertTokoUser = gql`
  mutation InsertToko($userId: String!, $objects: [toko_insert_input!] = {}) {
    insert_toko(
      objects: $objects
      on_conflict: {
        constraint: toko_pkey
        where: { users: { id: { _eq: $userId } } }
      }
    ) {
      returning {
        id
        namaToko
        alamat
        image
      }
    }
  }
`;

const UpdateStatusTokoUser = gql`
  mutation ChangeStatUserToko($id: String!, $tokoId: String!) {
    update_users(where: { id: { _eq: $id } }, _set: { tokoId: $tokoId }) {
      returning {
        id
        tokoId
      }
    }
  }
`;

const CreateTableUser = gql`
  mutation CreateUser($objects: [users_insert_input!] = {}) {
    insert_users(objects: $objects) {
      returning {
        id
        name
        tokoId
      }
    }
  }
`;

const CreateProductData = gql`
  mutation CreateProduct($objects: [product_insert_input!] = {}) {
    insert_product(objects: $objects) {
      returning {
        id
      }
    }
  }
`;

const EditProduct = gql`
  mutation UpdateProduct($id: String!, $harga: Int!, $namaProduk: String!) {
    update_product(
      where: { id: { _eq: $id } }
      _set: { harga: $harga, namaProduk: $namaProduk }
    ) {
      returning {
        id
      }
    }
  }
`;
const UpdateQtyProduct = gql`
  mutation UpdateProduct($id: String!, $qty: Int!) {
    update_product(where: { id: { _eq: $id } }, _set: { qty: $qty }) {
      returning {
        id
      }
    }
  }
`;

const InsertDetailProduct = gql`
  mutation CreateDetailProduct($object: detail_product_insert_input = {}) {
    insert_detail_product_one(object: $object) {
      id
      createdAt
      produkId
      qty
      status
      tokoId
    }
  }
`;

const DestroyProduct = gql`
  mutation DeleteProduct($id: String!) {
    delete_product(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

export {
  CreateTableUser,
  UpdateStatusTokoUser,
  InsertTokoUser,
  CreateProductData,
  InsertDetailProduct,
  EditProduct,
  DestroyProduct,
  UpdateQtyProduct,
};
