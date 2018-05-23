import gql from "graphql-tag";

export interface SendTestChargeResponse {
    sendStripeCharge: {
        result: string;
    }
}

export default gql`
    query SendTestCharge($id: String!) {
        sendStripeCharge(token_id: $id) {
            result
        }
    } 
`;