import { Component, OnInit, ComponentRef } from '@angular/core';

import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";
import { AwsAuthService } from "../aws-auth.service";
import { Router } from "@angular/router";

@Component({
    selector: 'auth-form',
    templateUrl: './auth-form.component.html',
    styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent implements OnInit {

    readonly contains_digit = /\d+/;
    readonly contains_uppercase = /[a-z]+/;
    readonly contains_lowercase = /[A-Z]+/;
    readonly contains_symbol = /[\^$*.[\]{}()\?\-"!@#%&\/\\,><':;\|_~`]+/;

    readonly allowed_symbols = "^ $ * . [ ] { } ( ) ? - \" ! @ # % & / \ , > < ' : ; | _ ~ `";

    form_group: FormGroup;

    private active_component_: { next: () => void };

    constructor(private auth_service_: AwsAuthService, private router_: Router) { };

    ngOnInit() {
        this.form_group = new FormGroup({
            email: new FormControl("", [Validators.required, Validators.email]),
            password: new FormControl("", [Validators.required, Validators.minLength(8), this.passwordValidation()]),
        });
    };

    passwordValidation(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors => {
            let password: string = control.value;

            let errors: ValidationErrors = {};

            if (!this.contains_digit.test(password)) {
                errors["digit"] = "Must contain at least one number";
            }

            if (!this.contains_lowercase.test(password)) {
                errors["lowercase"] = "Must contain at least one lowercase letter";
            }

            if (!this.contains_uppercase.test(password)) {
                errors["uppercase"] = "Must contain at least one UPPERCASE letter";
            }

            if (!this.contains_symbol.test(password)) {
                errors["symbol"] = "Must contain at least one of the following symbols: " + this.allowed_symbols;
            }

            return Object.keys(errors).length === 0 ? null : errors;
        }
    };

    setActive(component) {
        this.active_component_ = component;
    };

    onSubmit() {
        this.active_component_.next();
    };

}
