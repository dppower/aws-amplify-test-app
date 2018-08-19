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
        this.form_group.controls["Password"].enable();
    };

    ngAfterViewInit() {
        setTimeout(() => this.form_group.updateValueAndValidity(), 0);
    };

    next() {
        let details = this.form_group.value;
        this.auth_service_.signIn(details["Email"], details["Password"])
        .then(() => {
            this.router_.navigate(["/auth-test"]);
        })
        .catch(err => {
            if (err.code === "UserNotFoundException" || err.code === "NotAuthorizedException") {
                
            }
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
}
