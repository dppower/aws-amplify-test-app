import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { RouterModule, Router } from "@angular/router";
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AwsAuthModule } from "./aws-auth/aws-auth.module";
//import { AwsAppSyncModule } from "./aws-appsync/aws-appsync.module";
import { MatIconRegistry, MatIconModule } from "@angular/material";
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
        BrowserAnimationsModule,
        AwsAuthModule,
        MatIconModule
        //AwsAppSyncModule
        //ApolloClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {

    constructor(private mat_icon_registry_: MatIconRegistry, private dom_sanitizer_: DomSanitizer) {
        this.mat_icon_registry_.addSvgIcon(
            "warning-circle",
            this.dom_sanitizer_.bypassSecurityTrustResourceUrl("/assets/warning-circle.svg")
        );
    }
 }
