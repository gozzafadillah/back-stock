import { gql } from "@apollo/client";

const HistoryToko = gql`
  subscription HistoryToko($tokoId: String = "") {
    detail_product(where: { tokoId: { _eq: $tokoId } }) {
      product {
        id
        namaProduk
        harga
        qty
        categoryId
      }
      status
      createdAt
    }
  }
`;

const HistoryProductByTokoId = gql`
  subscription subscriptionProduct($tokoId: String!) {
    product(
      where: { detail_products: { tokoId: { _eq: $tokoId } } }
      order_by: { createdAt: asc }
    ) {
      id
      namaProduk
      harga
      qty
      categoryId
      createdAt
    }
  }
`;

export { HistoryToko, HistoryProductByTokoId };
