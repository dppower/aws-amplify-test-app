import { Component, OnInit } from '@angular/core';

import { AwsAppSyncService } from "../../aws-appsync/aws-appsync.service";
import getPostQuery, { GetPostResponse } from "../../graphql/queries/get-post";
import createPostMutation, { CreatePostResponse } from "../../graphql/mutations/create-post";

@Component({
    selector: 'auth-test',
    templateUrl: './auth-test.component.html',
    styleUrls: ['./auth-test.component.css']
})
export class AuthTestComponent implements OnInit {

    id = 236;

    get_response: GetPostResponse;
    post_response: object;

    constructor(private app_sync_: AwsAppSyncService) { };

    ngOnInit() {
    };

    getPost(id: string) {
        this.app_sync_.client.watchQuery<GetPostResponse>({
            query: getPostQuery,
            variables: {
                id
            }
        })
        .subscribe(({ data }) => {
            this.get_response = data;
        });
    };

    createPost(title: string) {
        let id = this.id++;
        this.app_sync_.client.mutate<CreatePostResponse>({
            mutation: createPostMutation,           
            variables: {
                id,
                title
            },
            optimisticResponse: {
                createPost: {
                    __typename: "Post",
                    title
                }
            },
            fetchPolicy: "no-cache"
        })
        .then(({data}) => {
            this.post_response = data;
        });
    };

}
