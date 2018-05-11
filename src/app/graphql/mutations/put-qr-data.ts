
import gql from "graphql-tag";

export interface PutQRDataResponse {
    putQRData: {
        id: string;
    }
}

export default gql`
    mutation putQRData($name: String!, $image: String!) {
        putQRData(data: { name: $name, image: $image }) {
            id
        }
    }
`;