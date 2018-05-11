import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Router } from "@angular/router";
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http"

import { AwsAuthModule } from "./aws-auth/aws-auth.module";
import { AwsAppSyncModule } from "./aws-appsync/aws-appsync.module";

import { AppComponent } from './app.component';

//import { ApolloClientModule } from './apollo-client/apollo-client.module';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,      
        RouterModule.forRoot([
            {
                path: "",
                redirectTo: "/auth-test",
                pathMatch: "full"               
            }
        ],
            { 
                //enableTracing: true,
                onSameUrlNavigation: "reload"
            }
        ),
        AwsAuthModule,
        AwsAppSyncModule
        //ApolloClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
