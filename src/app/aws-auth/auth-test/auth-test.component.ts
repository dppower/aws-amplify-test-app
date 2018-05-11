import { Component, OnInit } from '@angular/core';

import { AwsAppSyncService } from "../../aws-appsync/aws-appsync.service";
import getQRQuery, { GetQRDataResponse } from "../../graphql/queries/get-qr-data";
import putQRMutation, { PutQRDataResponse} from "../../graphql/mutations/put-qr-data";
import { AwsAuthService } from '../aws-auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from 'aws-amplify';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from "rxjs/Subscription";
import { map, switchMap, filter } from "rxjs/operators";
import { fromEvent } from "rxjs/observable/fromEvent";

@Component({
    selector: 'auth-test',
    templateUrl: './auth-test.component.html',
    styleUrls: ['./auth-test.component.css']
})
export class AuthTestComponent implements OnInit {

    id: string;

    qr_data_form_group: FormGroup;

    get_response: GetQRDataResponse;

    image_sub: Subscription;
    image_data_url: string;

    constructor(
        private auth_service_: AwsAuthService, private app_sync_: AwsAppSyncService, 
        private router_: Router, private activated_route_: ActivatedRoute
    ) { 

    };

    ngOnInit() {
        this.qr_data_form_group = new FormGroup({
            name: new FormControl("", [Validators.required]),
            file: new FormControl()
        });
        
        this.auth_service_.auth.currentAuthenticatedUser().then(user => {
            this.id = user.username;
        });

        //this.qr_data_form_group.valueChanges.subscribe((value) => console.log(value));
        this.image_sub = this.qr_data_form_group.get("file").valueChanges.pipe(
            filter(files => !!files),
            map((files: FileList) => files[0]),
            switchMap(file => {
                const fr = new FileReader();
                let obs = fromEvent(fr, "load");
                fr.readAsDataURL(file);
                return obs;
            }),
            map((event: ProgressEvent) => (<any>event.srcElement).result)
        ).subscribe(result => {
            this.image_data_url = result;
        });
    };

    getPost(id: string) {
        // this.app_sync_.client.watchQuery<GetPostResponse>({
        //     query: getPostQuery,
        //     variables: {
        //         id
        //     }
        // })
        // .subscribe(({ data }) => {
        //     this.get_response = data;
        // });

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

    async uploadImage(file: File) {
        try {     
            await Storage.put(file.name, file, {
                contentType: file.type
            });
        }
        catch (e) {
            console.log(`Image upload error: ${JSON.stringify(e)}.`);
        }
    };

    createData(name: string, image_url: string) {
        this.app_sync_.client.mutate<PutQRDataResponse>({
            mutation: putQRMutation,           
            variables: {
                name,
                image: image_url
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
            console.log(data);
        });
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

    async submitData() {
        let values = this.qr_data_form_group.value;
        console.log(values);
        let file = values.file[0];
        if (file) {
            await this.uploadImage(file);
        }
        try {
            await this.createData(values.name, file.name);
        }
        catch (e) {
            console.log(`mutation error: ${JSON.stringify(e)}.`)
        }
    };

    signOut() {
        this.auth_service_.signOut().then(() => {
            this.router_.navigate(["/auth/sign-in"]);
        });
    };

}
