import { Component, OnInit } from '@angular/core';

import { AwsAppSyncService } from "../../aws-appsync/aws-appsync.service";
import getPostQuery, { GetPostResponse } from "../../graphql/queries/get-post";
import createPostMutation, { CreatePostResponse } from "../../graphql/mutations/create-post";
import { AwsAuthService } from '../aws-auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'auth-test',
    templateUrl: './auth-test.component.html',
    styleUrls: ['./auth-test.component.css']
})
export class AuthTestComponent implements OnInit {

    id = 236;

    get_response: GetPostResponse;
    post_response: object;

    constructor(private app_sync_: AwsAppSyncService, private auth_service_: AwsAuthService,
        private router_: Router, private activated_route_: ActivatedRoute
    ) { };

    ngOnInit() {
        let code = this.activated_route_.snapshot.queryParamMap.get("code");
        if (code) {
            console.log(`code: ${code}`);
            this.router_.navigate(["/auth-test"]);
        }
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
            }
            // optimisticResponse: {
            //     createPost: {
            //         __typename: "Post",
            //         title
            //     }
            // },
            // fetchPolicy: "no-cache"
        })
        .then(({data}) => {
            this.post_response = data;
        });
    };

    signOut() {
        this.auth_service_.signOut().then(() => {
            //this.router_.navigate(["/auth/sign-in"]);
        });
    };

}
