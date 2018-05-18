import { Component, OnInit } from '@angular/core';
import {
    FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors,
    ControlContainer, FormGroupDirective
} from "@angular/forms";
import { AwsAuthService } from "../aws-auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import { codeValidator } from '../validators/code-validator';

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

    constructor(
        private parent_form_directive_: FormGroupDirective, private auth_service_: AwsAuthService,
        private router_: Router, private activated_route_: ActivatedRoute
    ) { };

    areInputsValid() {
        return this.form_group.get("Email").valid && this.form_group.get("Verify Code").valid;
    };

    ngOnInit() {
        this.form_group = this.parent_form_directive_.form;

        this.form_group.addControl("Verify Code", 
            new FormControl("", [Validators.required, codeValidator])
        );       
    };

    ngAfterViewInit() {
        setTimeout(() => this.form_group.updateValueAndValidity(), 0);
    };

    next() {
        let details = this.form_group.value;
        console.log(`confirm details: ${JSON.stringify(details)}.`);
        this.auth_service_.confirmSignUp(details["Email"], details["Verify Code"])
            .then(() => {
                console.log(`confirmed user sign up.`);
                this.router_.navigate(["../sign-in"], { relativeTo: this.activated_route_ });
            })
            .catch(err => {
                console.log(`sign up error: ${JSON.stringify(err)}.`);
            });
    };

    ngOnDestroy() {
        this.form_group.removeControl("Verify Code");
    };
}
