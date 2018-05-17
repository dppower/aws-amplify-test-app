import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import appSyncConfig from "../../appsync-config";
import { ApolloLink, concat } from 'apollo-link';
import { HttpHeaders } from '@angular/common/http';
import { AwsAuthService } from '../aws-auth/aws-auth.service';
import { CachePersistor } from "apollo-cache-persist";
import { Subject } from 'rxjs';

@Injectable()
export class ApolloClientService {

    get client() {
        return this.apollo_client_;
    };

    private persist_trigger_ = new Subject<void>();

    private cache_persistor_: CachePersistor<NormalizedCacheObject>;

    constructor(private apollo_client_: Apollo, private http_link_: HttpLink, private auth_service_: AwsAuthService) { };

    saveCache() {
        this.persist_trigger_.next();
    };

    async setupClient() {
        const cache = new InMemoryCache();
        this.cache_persistor_ = new CachePersistor({
            cache,
            storage: window.localStorage
            //trigger: this.trigger
        });
        await this.cache_persistor_.restore();

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
            cache
        });
    };

    async clearCache() {
        await this.cache_persistor_.purge();
    };

    private trigger = (persist: () => void): (() => void) => {
        const subscription = this.persist_trigger_.subscribe(persist);
        return () => subscription.unsubscribe();
    };
}
