import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Router } from "@angular/router";
import { NgModule } from '@angular/core';

import { AwsAuthModule } from "./aws-auth/aws-auth.module";
import { AwsAppSyncModule } from "./aws-appsync/aws-appsync.module";

import { AppComponent } from './app.component';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,       
        RouterModule.forRoot([
            {
                path: "",
                redirectTo: "/auth-test",
                pathMatch: "full"               
            }
        ], { enableTracing: true }),
        AwsAuthModule,
        AwsAppSyncModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { 

    constructor(router: Router) {
        console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
    };
}
