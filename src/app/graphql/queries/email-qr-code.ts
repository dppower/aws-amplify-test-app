import gql from "graphql-tag";

export interface EmailQRCodeResponse {
    emailQRCode: {
        result: string;
    }
}

export default gql`
    query emailQRCode {
        emailQRCode {
            result
        }
    } 
`;