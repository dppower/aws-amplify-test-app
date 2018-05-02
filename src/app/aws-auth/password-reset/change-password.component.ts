import { Component, OnInit } from '@angular/core';
import {
    FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors,
    ControlContainer, FormGroupDirective
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AwsAuthService } from '../aws-auth.service';
import { passwordValidator } from '../validators/password-validator';
import { AuthDetails } from '../auth-form/auth-details';

@Component({
    selector: 'change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.css'],
    viewProviders: [
        { provide: ControlContainer, useExisting: FormGroupDirective }
    ]
})
export class ChangePasswordComponent implements OnInit {

    form_group: FormGroup;

    constructor(
        private parent_form_directive_: FormGroupDirective, private auth_service_: AwsAuthService,
        private router_: Router, private activated_route_: ActivatedRoute
    ) { };

    ngOnInit() {
        this.form_group = this.parent_form_directive_.form;

        this.form_group.addControl("new_password",
            new FormControl("", [Validators.required, passwordValidator])
        );
    };

    async next() {
        let details: AuthDetails = this.form_group.value;
        
        try {
            let user: any;
            try {
                user = await this.auth_service_.auth.currentAuthenticatedUser();
            }
            catch (e) { }

            if (!user) {
                user = await this.auth_service_.auth.signIn(details.email, details.password);
            }
            await this.auth_service_.auth.changePassword(user, details.password, details.new_password);
            this.router_.navigate(["../../auth-test"], { relativeTo: this.activated_route_ });
        }
        catch (e) {
            console.log(`change password error: ${JSON.stringify(e)}.`);
        }
    };

    ngOnDestroy() {
        this.form_group.removeControl("new_password");
    }

}
