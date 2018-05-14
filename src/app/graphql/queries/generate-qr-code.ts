import gql from "graphql-tag";

export interface GenerateQRCodeResponse {
    generateQRCode: {
        result: string;
    }
}

export default gql`
    query GenerateQRCode {
        generateQRCode {
            result
        }
    } 
`;