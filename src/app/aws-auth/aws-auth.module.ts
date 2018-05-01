import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { AwsAuthRoutingModule } from './aws-auth-routing.module';
import { AwsAuthService } from './aws-auth.service';
import { SignInComponent } from './sign-in/sign-in.component';
import { ConfirmSignInComponent } from './sign-in/confirm-sign-in.component';
import { ConfirmSignUpComponent } from './sign-up/confirm-sign-up.component';
import { AuthTestComponent } from './auth-test/auth-test.component';
import { RegisterDetailsComponent } from './sign-up/register-details.component';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { ForgotPasswordComponent } from './password-reset/forgot-password.component';
import { ChangePasswordComponent } from './password-reset/change-password.component';

@NgModule({
    imports: [
        CommonModule,
        AwsAuthRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [SignInComponent, ConfirmSignInComponent, ConfirmSignUpComponent, AuthTestComponent, RegisterDetailsComponent, AuthFormComponent, ForgotPasswordComponent, ChangePasswordComponent],
    providers: [AwsAuthService]
})
export class AwsAuthModule { }
