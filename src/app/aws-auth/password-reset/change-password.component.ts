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

        this.form_group.addControl("New Password",
            new FormControl("", [Validators.required, passwordValidator])
        );
    };

    ngAfterViewInit() {
        setTimeout(() => this.form_group.updateValueAndValidity(), 0);
    };

    async next() {
        let details = this.form_group.value;
        
        try {
            let user: any;
            try {
                user = await this.auth_service_.auth.currentAuthenticatedUser();
            }
            catch (e) { }

            if (!user) {
                user = await this.auth_service_.auth.signIn(details["Email"], details["Password"]);
            }
            await this.auth_service_.auth.changePassword(user, details["Password"], details["New Password"]);

            this.form_group.get("Password").setValue(details["New Password"]);
            this.router_.navigate(["../sign-in"], { relativeTo: this.activated_route_ });
        }
        catch (e) {
            console.log(`change password error: ${JSON.stringify(e)}.`);
        }
    };

    ngOnDestroy() {
        this.form_group.removeControl("New Password");
    }

}
