
import gql from "graphql-tag";

export interface putQRDataResponse {
    putQRData: {
        id: string;
        name: string;
        image: string;
    }
}

export default gql`
    mutation putQRData($name: String!, $image: String!) {
        putQRData(data: { name: $name, image: $image }) {
            id
        }
    }
`;