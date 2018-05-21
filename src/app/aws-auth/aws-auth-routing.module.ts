import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthTestComponent } from './auth-test/auth-test.component';
import { AuthGuardService } from './auth-guard.service';

import { SignInComponent } from "./sign-in/sign-in.component";
import { ConfirmSignInComponent } from './sign-in/confirm-sign-in.component';

import { RegisterDetailsComponent } from "./sign-up/register-details.component";
import { ConfirmSignUpComponent } from './sign-up/confirm-sign-up.component';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { ForgotPasswordComponent } from './password-reset/forgot-password.component';
import { ChangePasswordComponent } from './password-reset/change-password.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';

const routes: Routes = [   
    {
        path: "auth-test",
        component: PaymentFormComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: "auth",
        component: AuthFormComponent,
        children: [
            {
                path: "confirm",
                component: ConfirmSignUpComponent
            },
            {
                path: "register",
                component: RegisterDetailsComponent
            },                       
            {
                path: "sign-in",
                component: SignInComponent
            },
            {
                path: "forgot",
                component: ForgotPasswordComponent
            },
            {
                path: "change",
                component: ChangePasswordComponent
            },
            {
                path: "code",
                component: ConfirmSignInComponent
            },
            {
                path: "",
                redirectTo: "sign-in",
                pathMatch: "full"
            }
        ]
    } 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [AuthGuardService],
    exports: [RouterModule]
})
export class AwsAuthRoutingModule { }
