import { Component, OnInit, ComponentRef } from '@angular/core';

import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";
import { AwsAuthService } from "../aws-auth.service";
import { Router } from "@angular/router";
import { passwordValidator } from '../validators/password-validator';

@Component({
    selector: 'auth-form',
    templateUrl: './auth-form.component.html',
    styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent implements OnInit {

    form_group: FormGroup;

    private active_component_: { next: () => void };

    constructor(private auth_service_: AwsAuthService, private router_: Router) { };

    ngOnInit() {
        this.form_group = new FormGroup({
            email: new FormControl("", [Validators.required, Validators.email]),
            password: new FormControl("", [Validators.required, Validators.minLength(8), passwordValidator]),
        });
    };

    setActive(component) {
        this.active_component_ = component;
    };

    onSubmit() {
        this.active_component_.next();
    };
}
