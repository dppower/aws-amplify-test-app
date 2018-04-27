import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

interface SignUpDetails {
    username: string;
    password: string;
    email: string;
}

@Component({
    selector: 'auth-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

    readonly contains_digit = /\d+/;
    readonly contains_uppercase = /[a-z]+/;
    readonly contains_lowercase = /[A-Z]+/;
    readonly contains_symbol = /[\^$*.[\]{}()\?\-"!@#%&\/\\,><':;\|_~`]+/;

    readonly allowed_symbols = "^ $ * . [ ] { } ( ) ? - \" ! @ # % & / \ , > < ' : ; | _ ~ `";

    form_group: FormGroup;

    constructor() { };

    ngOnInit() {
        this.form_group = new FormGroup({
            username: new FormControl("", Validators.required),
            password: new FormControl("", [Validators.required, Validators.minLength(8), this.passwordValidation()]),
            confirm_password: new FormControl(""),
            email: new FormControl("", [Validators.required, Validators.email])
        });

        this.form_group.get("confirm_password").setValidators([Validators.required, this.confirmPasswordValidation()]);

        this.form_group.valueChanges.subscribe(details => {
            console.log(details);
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

    confirmPasswordValidation(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors => {
            let errors: ValidationErrors = {};

            let confirm = control.value;
            
            let password = control.parent.get("password").value;

            if (confirm !== password) {
                errors["confirm"] = "Passwords do not match";                
            }

            return Object.keys(errors).length === 0 ? null : errors;
        }
    };
}
