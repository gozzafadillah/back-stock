import { gql } from "@apollo/client";

const HistoryToko = gql`
  subscription HistoryToko($tokoId: String = "") {
    detail_product(
      where: { tokoId: { _eq: $tokoId } }
      order_by: { createdAt: desc }
    ) {
      product {
        id
        namaProduk
        harga
        qty
        categoryId
      }
      qty
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

const CountProduct = gql`
  subscription MySubscription($tokoId: String!) {
    product_aggregate(
      where: { detail_products: { tokoId: { _eq: $tokoId } } }
    ) {
      aggregate {
        count(columns: categoryId)
      }
    }
  }
`;

export { HistoryToko, HistoryProductByTokoId, CountProduct };
