import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApolloClientService } from './apollo-client.service';
import { ApolloModule } from "apollo-angular";
import { HttpLinkModule } from "apollo-angular-link-http";

@NgModule({
    imports: [
        ApolloModule,
        HttpLinkModule
    ],
    declarations: [],
    providers: [ApolloClientService]
})
export class ApolloClientModule { }
