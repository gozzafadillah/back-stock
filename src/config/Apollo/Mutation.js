import { gql } from "@apollo/client";

const InsertTokoUser = gql`
  mutation InsertToko($userId: String!, $objects: [toko_insert_input!] = {}) {
    insert_toko(
      objects: $objects
      on_conflict: {
        where: { userID: { _eq: $userId } }
        constraint: toko_pkey
      }
    ) {
      returning {
        id
        namaToko
        alamat
        image
        userID
      }
    }
  }
`;

const UpdateStatusTokoUser = gql`
  mutation ChangeStatUserToko($id: String!, $tokoId: String!) {
    update_users_by_pk(pk_columns: { id: $id }, _set: { tokoId: $tokoId }) {
      id
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

export { CreateTableUser, UpdateStatusTokoUser, InsertTokoUser };
