import { Validators, ValidatorFn, ValidationErrors, AbstractControl } from "@angular/forms";

const contains_digit = /\d+/;
const contains_uppercase = /[a-z]+/;
const contains_lowercase = /[A-Z]+/;
const contains_symbol = /[\^$*.[\]{}()\?\-"!@#%&\/\\,><':;\|_~`]+/;

const allowed_symbols = "^ $ * . [ ] { } ( ) ? - \" ! @ # % & / \ , > < ' : ; | _ ~ `";

export const passwordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors => {
    let password: string = control.value;

    let errors: ValidationErrors = {};

    if (!contains_digit.test(password)) {
        errors["digit"] = "Must contain at least one number";
    }

    if (!contains_lowercase.test(password)) {
        errors["lowercase"] = "Must contain at least one lowercase letter";
    }

    if (!contains_uppercase.test(password)) {
        errors["uppercase"] = "Must contain at least one UPPERCASE letter";
    }

    if (!contains_symbol.test(password)) {
        errors["symbol"] = "Must contain at least one of the following symbols: " + allowed_symbols;
    }

    return Object.keys(errors).length === 0 ? null : errors;
};
