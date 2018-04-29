import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AwsAuthService } from '../aws-auth.service';

@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

    form_group: FormGroup;

    constructor(private auth_service_: AwsAuthService) { };

    ngOnInit() {
        this.form_group = new FormGroup({
            username: new FormControl("", Validators.required),
            password: new FormControl("", [Validators.required, Validators.minLength(8)])
        });
    };

    submitSignInDetails() {
        let details = this.form_group.value;
        this.auth_service_.signIn(details.username, details.password)
        .then(() => {
            console.log("Signed user into cognito pools.");
            this.form_group.reset();
        })
        .catch(err => {
            console.log(`sign in err: ${JSON.stringify(err)}.`);
        });
    };

}
