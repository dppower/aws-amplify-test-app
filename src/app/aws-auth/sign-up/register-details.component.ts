import { Component, OnInit, OnDestroy } from '@angular/core';
import {
    FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors,
    ControlContainer, FormGroupDirective
} from "@angular/forms";
import { AwsAuthService } from "../aws-auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthDetails } from "../auth-form/auth-details";

@Component({
    selector: 'register-details',
    templateUrl: './register-details.component.html',
    styleUrls: ['./register-details.component.css'],
    viewProviders: [
        { provide: ControlContainer, useExisting: FormGroupDirective }
    ]
})
export class RegisterDetailsComponent implements OnInit, OnDestroy {

    form_group: FormGroup;

    constructor(
        private parent_form_directive_: FormGroupDirective, private auth_service_: AwsAuthService,
        private router_: Router, private activated_route_: ActivatedRoute
    ) { };

    ngOnInit() {
        this.form_group = this.parent_form_directive_.form;

        this.form_group.addControl(
            "Confirm Password", 
            new FormControl("", [Validators.required, this.confirmPasswordValidation()])
        );
    };

    ngAfterViewInit() {
        setTimeout(() => this.form_group.updateValueAndValidity(), 0);
    };

    confirmPasswordValidation(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors => {
            let errors: ValidationErrors = {};

            let confirm = control.value;

            let password = this.form_group.get("Password").value;

            if (confirm !== password) {
                errors["confirm"] = "Passwords do not match";
            }

            return Object.keys(errors).length === 0 ? null : errors;
        }
    };

    next() {
        let details = this.form_group.value;
        this.auth_service_.signUp(details["Email"], details["Password"])
            .then(() => {
                console.log("Added user to cognito pools.");
                //this.form_group.reset();
                this.router_.navigate(["../confirm"], { relativeTo: this.activated_route_ });
            })
            .catch(err => {
                console.log(`sign up error: ${JSON.stringify(err)}.`);
            });
    };

    navigate(route: string) {
        this.router_.navigate([`../${route}`], { relativeTo: this.activated_route_ });
    };

    ngOnDestroy() {
        this.form_group.removeControl("Confirm Password");
    };
}
