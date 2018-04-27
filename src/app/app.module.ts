import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';

import { AwsAuthModule } from "./aws-auth/aws-auth.module";

import { AppComponent } from './app.component';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AwsAuthModule,
        RouterModule.forRoot([
            {
                path: "",
                pathMatch: "full",
                redirectTo: "/auth"
            }
        ])    
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
