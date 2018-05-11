import { Component, OnInit } from '@angular/core';

import { AwsAppSyncService } from "../../aws-appsync/aws-appsync.service";
import getPostQuery, { GetPostResponse } from "../../graphql/queries/get-post";
import createPostMutation, { CreatePostResponse } from "../../graphql/mutations/create-post";
import { AwsAuthService } from '../aws-auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from 'aws-amplify';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'auth-test',
    templateUrl: './auth-test.component.html',
    styleUrls: ['./auth-test.component.css']
})
export class AuthTestComponent implements OnInit {

    id: string;

    qr_data_form_group: FormGroup;

    get_response: GetPostResponse;
    post_response: object;

    constructor(
        private auth_service_: AwsAuthService, private app_sync_: AwsAppSyncService, 
        private router_: Router, private activated_route_: ActivatedRoute
    ) { 
        
    };

    ngOnInit() {
        this.qr_data_form_group = new FormGroup({
            name: new FormControl("")
        });
        
        this.auth_service_.auth.currentAuthenticatedUser().then(user => {
            this.id = user.username;
        });
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

        // this.apollo_service_.client.watchQuery<GetPostResponse>({
        //     query: getPostQuery,
        //     variables: {
        //         id
        //     }
        // }).valueChanges.subscribe(({data}) => {
        //     this.get_response = data;
        //     //this.apollo_service_.saveCache();
        // });
    };

    uploadImage() {
        Storage.put('test.txt', 'Hello')
            .then (result => console.log(result))
            .catch(err => console.log(err));
    };

    createData(name: string) {
        // this.app_sync_.client.mutate<CreatePostResponse>({
        //     mutation: createPostMutation,           
        //     variables: {
        //         id,
        //         title
        //     }
        //     // optimisticResponse: {
        //     //     createPost: {
        //     //         __typename: "Post",
        //     //         title
        //     //     }
        //     // },
        //     // fetchPolicy: "no-cache"
        // })
        // .then(({data}) => {
        //     this.post_response = data;
        // });
        // this.apollo_service_.client.mutate<CreatePostResponse>({
        //     mutation: createPostMutation,
        //     variables: {
        //         id,
        //         title
        //     }
        // }).subscribe(({data}) => {
        //     this.post_response = data;
        // });
    };

    submitData() {

    };

    signOut() {
        this.auth_service_.signOut().then(() => {
            this.router_.navigate(["/auth/sign-in"]);
        });
    };

}
