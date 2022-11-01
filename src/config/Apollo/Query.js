import { gql } from "@apollo/client";

const GetUserById = gql`
  query GetUser($id: String = "") {
    users(where: { id: { _eq: $id } }) {
      email
      id
      name
      password
      tokoId
    }
  }
`;

export { GetUserById };
