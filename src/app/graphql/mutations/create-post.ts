
import gql from "graphql-tag";

export interface CreatePostResponse {
    createPost: {
        title: string
    }
}

export default gql`
    mutation createPost($id: ID!, $title: String!) {
        createPost(input: { id: $id, title: $title }) {
            title
        }
    }
`;