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
import { FileInputComponent } from './file-input/file-input.component';
import { MatTooltipModule } from "@angular/material";
import { InputTooltipComponent } from './input-tooltip/input-tooltip.component';
//import { AwsAppSyncModule } from "../aws-appsync/aws-appsync.module";
import { MatIconModule } from "@angular/material";
import { ErrorBannerComponent } from './input-tooltip/error-banner.component';
import { OverlayModule } from "@angular/cdk/overlay";
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { CardInputComponent } from './payment-form/card-input.component';
import { PaymentRequestComponent } from './payment-form/payment-request.component';

@NgModule({
    imports: [
        CommonModule,
        AwsAuthRoutingModule,
        ReactiveFormsModule,
        MatTooltipModule,
        MatIconModule,
        OverlayModule
        //AwsAppSyncModule
    ],
    declarations: [
        SignInComponent, ConfirmSignInComponent, ConfirmSignUpComponent, AuthTestComponent,
        RegisterDetailsComponent, AuthFormComponent, ForgotPasswordComponent, ChangePasswordComponent,
        FileInputComponent, InputTooltipComponent, ErrorBannerComponent, PaymentFormComponent, CardInputComponent, PaymentRequestComponent
    ],
    entryComponents: [ErrorBannerComponent],
    providers: [AwsAuthService]
})
export class AwsAuthModule { }
