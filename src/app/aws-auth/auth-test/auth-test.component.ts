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
import generateQrCode, { GenerateQRCodeResponse } from '../../graphql/queries/generate-qr-code';
import emailQrCode, { EmailQRCodeResponse } from '../../graphql/queries/email-qr-code';

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
    qr_code_url: string;

    constructor(
        private auth_service_: AwsAuthService, private app_sync_: AwsAppSyncService, 
        private router_: Router, private activated_route_: ActivatedRoute
    ) { 

    };

    ngOnInit() {
        this.qr_data_form_group = new FormGroup({
            name: new FormControl("", [Validators.required]),
            position: new FormControl(""),
            phone: new FormControl("", [Validators.required]),
            mobile: new FormControl("", [Validators.required]),
            fax: new FormControl(""),
            email: new FormControl("", [Validators.required]),
            company_name: new FormControl("", [Validators.required]),
            company_website: new FormControl(""),
            company_address_1: new FormControl("", [Validators.required]),
            company_address_2: new FormControl(""),           
            company_city: new FormControl("", [Validators.required]),
            company_state: new FormControl("", [Validators.required]),
            pin: new FormControl("", [Validators.required]),
            image: new FormControl()
        });
        
        this.auth_service_.auth.currentAuthenticatedUser().then(user => {
            this.id = user.username;
        });

        //this.qr_data_form_group.valueChanges.subscribe((value) => console.log(value));
        this.image_sub = this.qr_data_form_group.get("image").valueChanges.pipe(
            filter(files => !!files),
            map((files: FileList) => files[0]),
            switchMap(file => {
                const fr = new FileReader();
                let obs = fromEvent(fr, "load");
                fr.readAsDataURL(file);
                return obs;
            }),
            map((event: ProgressEvent) => (<any>event.target).result)
        ).subscribe(result => {
            this.image_data_url = result;
        });

        // this.auth_service_.auth.currentCredentials().then((cred) => {
        //     console.log(`credentials: ${JSON.stringify(cred)}.`);
        // });
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

    async displayQRCode() {
        try {     
            let response: any = await Storage.get("qrcode.png");
            this.qr_code_url = response;
        }
        catch (e) {
            console.log(`qrCode display error: ${JSON.stringify(e)}.`);
        }
    };

    emailQRCode() {
        this.app_sync_.client.watchQuery<EmailQRCodeResponse>({
            query: emailQrCode
        })
        // .filter(({data}) => {
        //     return !!data.generateQRCode.result;
        // })
        .subscribe(({ data }) => {
            console.log(`email qr code response: ${JSON.stringify(data)}.`);           
        });
    };

    generateQRCode() {
        this.app_sync_.client.watchQuery<GenerateQRCodeResponse>({
            query: generateQrCode
        })
        // .filter(({data}) => {
        //     return !!data.generateQRCode.result;
        // })
        .subscribe(({ data }) => {
            console.log(`generate qr code response: ${JSON.stringify(data)}.`);           
        });
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

    createData(values: object, image_name: string) {
        for (let key in values) {
            if (values[key] === "") {
                delete values[key];
            }
        }
        console.log(Object.assign({}, values, { image: image_name }));

        this.app_sync_.client.mutate<PutQRDataResponse>({
            mutation: putQRMutation,           
            variables: {
                values: Object.assign({}, values, { image: image_name })
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
        })
        .catch(err => {
            console.log(`submit qrcode data error: ${JSON.stringify(err)}.`);
        })
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

        let file = values.image[0];
        if (file) {
            await this.uploadImage(file);
        }
        try {
            await this.createData(values, file.name);
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
