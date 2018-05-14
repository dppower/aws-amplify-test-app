
import gql from "graphql-tag";

export interface PutQRDataResponse {
    putQRData: {
        id: string;
    }
}

export default gql`
    mutation putQRData($values: QRInput!) {
        putQRData(data: $values) {
            id
        }
    }
`;