import gql from "graphql-tag";

export interface GetPostResponse {
    getPost: {
        title: string
    }
}

export default gql`
    query getPost($id: ID!) {
        getPost(id: $id) {
            title
        }
    } 
`;