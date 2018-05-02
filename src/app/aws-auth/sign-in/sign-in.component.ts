import { Component, OnInit } from '@angular/core';
import {
    FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors,
    ControlContainer, FormGroupDirective
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AwsAuthService } from '../aws-auth.service';
import authConfig from "../../../aws-auth-config";

@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css'],
    viewProviders: [
        { provide: ControlContainer, useExisting: FormGroupDirective }
    ]
})
export class SignInComponent implements OnInit {

    form_group: FormGroup;

    constructor(
        private parent_form_directive_: FormGroupDirective, private auth_service_: AwsAuthService,
        private router_: Router, private activated_route_: ActivatedRoute
    ) { };

    ngOnInit() { 
        this.form_group = this.parent_form_directive_.form;
    };

    next() {
        let details = this.form_group.value;
        this.auth_service_.signIn(details.email, details.password)
        .then(() => {
            console.log("Signed user into cognito pools.");
            this.router_.navigate(["/auth-test"]);
        })
        .catch(err => {
            console.log(`sign in err: ${JSON.stringify(err)}.`);
        });
    };

    navigateToSignUp() {
        this.router_.navigate(["../register"], { relativeTo: this.activated_route_ });
    };

    navigateToForgotPassword() {
        this.router_.navigate(["../forgot"], { relativeTo: this.activated_route_ });
    };

    navigateToChangePassword() {
        this.router_.navigate(["../change"], { relativeTo: this.activated_route_ });
    };

    navigateToHostedUI() {
        const { domain, redirectSignIn, redirectSignOut, responseType} = authConfig.Auth.oauth;
        const clientId = authConfig.Auth.userPoolWebClientId;
        const url = 'https://' + domain + '/login?redirect_uri=' + redirectSignIn + '&response_type=' + responseType + '&client_id=' + clientId;
        window.location.assign(url);
    }
}
