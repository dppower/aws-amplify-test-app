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
        ],
            { 
                enableTracing: true,
                onSameUrlNavigation: "reload"
            }
        ),
        AwsAuthModule,
        AwsAppSyncModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
