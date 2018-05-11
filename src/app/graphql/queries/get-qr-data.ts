import gql from "graphql-tag";

export interface GetQRDataResponse {
    getQRData: {
        id: string;
        name: string;
        image: string;
    }
}

export default gql`
    query getQRData($id: ID!) {
        getQRData(id: $id) {
            id,
            name,
            image
        }
    } 
`;