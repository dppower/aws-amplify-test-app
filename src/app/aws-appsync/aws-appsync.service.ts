import { Injectable } from "@angular/core";
import AppSyncClient from "aws-appsync";
import config from "../../appsync-config";
import { AwsAuthService } from "../aws-auth/aws-auth.service";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";

@Injectable({
    providedIn: "root"
})
export class AwsAppSyncService {

    readonly client: ApolloClient<InMemoryCache>;

    constructor(private auth_service_: AwsAuthService) {
        this.client = new AppSyncClient({
            url: config.graphqlEndpoint,
            region: config.region,
            auth: {
                type: config.authenticationType,
                credentials: async() => await this.auth_service_.auth.currentCredentials()
                //jwtToken: async() => (await this.auth_service_.auth.currentSession()).getIdToken().getJwtToken()
            },
            disableOffline: true
        });
    };
}
