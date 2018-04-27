import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";

const routes: Routes = [   
    {
        path: "auth",
        redirectTo: "/sign-up"
    },            
    {
        path: "sign-in",
        component: SignInComponent
    },
    {
        path: "sign-up",
        component: SignUpComponent
    }
    // {
    //     path: "confirm-sign-in"
    // },
    // {
    //     path: "confirm-sign-up"
    // },
    // {
    //     path: "forgot-password"
    // },
    // {
    //     path: "require-new-password"
    // }  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AwsAuthRoutingModule { }
