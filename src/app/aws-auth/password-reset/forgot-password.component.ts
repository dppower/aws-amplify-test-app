import { Component, OnInit, OnDestroy } from '@angular/core';
import {
    FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors,
    ControlContainer, FormGroupDirective
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AwsAuthService } from '../aws-auth.service';
import { codeValidator } from '../validators/code-validator';
import { passwordValidator } from "../validators/password-validator";

@Component({
    selector: 'forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.css'],
    viewProviders: [
        { provide: ControlContainer, useExisting: FormGroupDirective }
    ]
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

    form_group: FormGroup;

    constructor(
        private parent_form_directive_: FormGroupDirective, private auth_service_: AwsAuthService,
        private router_: Router, private activated_route_: ActivatedRoute
    ) { };

    ngOnInit() {
        this.form_group = this.parent_form_directive_.form;

        this.form_group.get("Password").reset();
        this.form_group.addControl("Reset Code",
            new FormControl("", [Validators.required, codeValidator])
        );

        this.form_group.addControl("New Password",
            new FormControl("", [Validators.required, passwordValidator])
        );
    };

    ngAfterViewInit() {
        setTimeout(() => this.form_group.updateValueAndValidity(), 0);
    };

    next() {
        let details = this.form_group.value;

        this.auth_service_.auth.forgotPasswordSubmit(details["Email"], details["Reset Code"], details["Password"])
            .then(() => {
                console.log("Reset password.");
                this.form_group.get("Password").setValue(details["New Password"]);
                this.router_.navigate(["../sign-in"], { relativeTo: this.activated_route_ });
            })
            .catch(err => {
                console.log(`sign in err: ${JSON.stringify(err)}.`);
            });
    };

    isValidEmail() {
        return this.form_group.get("Email").valid;
    };

    sendConfirmCode() {
        let email = this.form_group.value["Email"];
        this.auth_service_.auth.forgotPassword(email).then(() => { }).catch(err => { console.log(err) });
    };

    ngOnDestroy() {
        this.form_group.removeControl("Reset Code");
        this.form_group.removeControl("New Password");
    }
}
