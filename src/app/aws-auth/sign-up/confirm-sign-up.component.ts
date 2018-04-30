import { Component, OnInit } from '@angular/core';
import {
    FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors,
    ControlContainer, FormGroupDirective
} from "@angular/forms";
import { AwsAuthService } from "../aws-auth.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: 'confirm-sign-up',
    templateUrl: './confirm-sign-up.component.html',
    styleUrls: ['./confirm-sign-up.component.css'],
    viewProviders: [
        { provide: ControlContainer, useExisting: FormGroupDirective }
    ]

})
export class ConfirmSignUpComponent implements OnInit {

    form_group: FormGroup;

    readonly six_digit_code = /\d{6}/;

    constructor(
        private parent_form_directive_: FormGroupDirective, private auth_service_: AwsAuthService,
        private router_: Router, private activated_route_: ActivatedRoute
    ) { };

    areInputsValid() {
        return this.form_group.get("email").valid && this.form_group.get("email_verification");
    };

    ngOnInit() {
        // this.form_group = new FormGroup({
        //     username: new FormControl("", Validators.required),
        //     password: new FormControl("", [Validators.required, Validators.minLength(8), this.passwordValidation()]),
        //     confirm_password: new FormControl(""),
        //     email: new FormControl("", [Validators.required, Validators.email])
        // });
        this.form_group = this.parent_form_directive_.form;

        this.form_group.addControl("email_verification", 
            new FormControl("", [Validators.required, Validators.pattern(this.six_digit_code)])
        );

        //this.form_group.get("confirm_password").setValidators([Validators.required, this.confirmPasswordValidation()]);

        // this.form_group.valueChanges.subscribe(details => {
        //     console.log(details);
        // });
    };

    next() {
        let details = this.form_group.value;
        console.log(`confirm details: ${JSON.stringify(details)}.`);
        this.auth_service_.confirmSignUp(details.email, details.email_verification)
            .then(() => {
                console.log(`confirmed user sign up.`);
                this.router_.navigate(["../sign-in"], { relativeTo: this.activated_route_ });
            })
            .catch(err => {
                console.log(`sign up error: ${JSON.stringify(err)}.`);
            });
    };

    ngOnDestroy() {
        this.form_group.removeControl("email_verification");
    };
}
