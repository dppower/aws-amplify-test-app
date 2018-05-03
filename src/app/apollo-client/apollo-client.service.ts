import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from "apollo-cache-inmemory";
import appSyncConfig from "../../appsync-config";
import { ApolloLink, concat } from 'apollo-link';
import { HttpHeaders } from '@angular/common/http';
import { AwsAuthService } from '../aws-auth/aws-auth.service';

@Injectable()
export class ApolloClientService {

    get client() {
        return this.apollo_client_;       
    };

    constructor(private apollo_client_: Apollo, private http_link_: HttpLink, private auth_service_: AwsAuthService) { };

    async setupClient() {
        const http_link = this.http_link_.create({
            uri: appSyncConfig.graphqlEndpoint
            //withCredentials: true
        });

        let token = (await this.auth_service_.auth.currentSession()).getIdToken().getJwtToken();

        const auth_link = new ApolloLink((operation, forward) => {
            
            operation.setContext({
                headers: new HttpHeaders({
                    "Authorization": token
                })
            });
            return forward(operation);
        });

        this.apollo_client_.create({
            link: concat(auth_link, http_link),
            cache: new InMemoryCache()
        });
    };

}
