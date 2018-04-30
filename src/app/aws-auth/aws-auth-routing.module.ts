import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthTestComponent } from './auth-test/auth-test.component';
import { AuthGuardService } from './auth-guard.service';

import { SignInComponent } from "./sign-in/sign-in.component";
import { ConfirmSignInComponent } from './sign-in/confirm-sign-in.component';

import { RegisterDetailsComponent } from "./sign-up/register-details.component";
import { ConfirmSignUpComponent } from './sign-up/confirm-sign-up.component';
import { AuthFormComponent } from './auth-form/auth-form.component';

const routes: Routes = [   
    {
        path: "auth-test",
        component: AuthTestComponent,
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
                path: "",
                redirectTo: "sign-in",
                pathMatch: "full"
            }
        ]
    },
    {
        path: "confirm-sign-in",
        component: ConfirmSignInComponent
    }    
    // {
    //     path: "forgot-password"
    // },
    // {
    //     path: "require-new-password"
    // }  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [AuthGuardService],
    exports: [RouterModule]
})
export class AwsAuthRoutingModule { }
