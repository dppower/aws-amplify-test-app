import { Validators } from "@angular/forms";

const six_digit_code = /\d{6}/;

export const codeValidator = Validators.pattern(six_digit_code);