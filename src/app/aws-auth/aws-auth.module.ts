import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { AwsAuthRoutingModule } from './aws-auth-routing.module';
import { AwsAuthService } from './aws-auth.service';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
    imports: [
        CommonModule,
        AwsAuthRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [SignInComponent, SignUpComponent],
    providers: [AwsAuthService]
})
export class AwsAuthModule { }
