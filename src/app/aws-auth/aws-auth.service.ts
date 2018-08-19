import { Injectable } from "@angular/core";

import { ReplaySubject } from "rxjs";

import Amplify from "@aws-amplify/core";
import Auth, { AuthClass } from "@aws-amplify/auth";
import auth_config from "../../aws-auth-config";

interface AuthState {
    state: "signed-out" | "signed-in" | "mfa-required" | "new-password-required"
    user: any;
}

@Injectable()
export class AwsAuthService {

    get auth() {
        return this.auth_;
    };

    // get auth_state() {
    //     return this.auth_state_.getValue();
    // };

    set auth_state(state: AuthState) {
        this.auth_state_.next(state);
    };

    private auth_: AuthClass;
    private auth_state_ = new ReplaySubject<AuthState>(1);

    readonly auth_state_changes = this.auth_state_.asObservable();

    constructor() {
        Amplify.configure(auth_config);
        this.auth_ = Auth;
        this.checkUser();

        this.auth_state_changes.subscribe((change) => {
            console.log(`user: ${JSON.stringify(change.user && change.user.username)}, state: ${change.state}.`)
        });
    };

    private checkUser() {
        // check for current authenticated user to init authState
        this.auth_.currentAuthenticatedUser()
            .then(user => {
                this.auth_state = { state: "signed-in", user: user };
            })
            .catch(err => {
                this.auth_state = { state: "signed-out", user: null };
            });
    };

    async signIn(username: string, password: string) {
        let user = await this.auth_.signIn(username, password);

        //console.log(user);
        //console.log(`user: ${JSON.stringify(user)}.`);
        if (user.challengeName) {
            console.log(user.challengeName);
        }
    };

    async confirmSignIn() {
        // MFA is enabled

    };

    async signOut() {
        await this.auth_.signOut();
    };

    async signUp(email: string, password: string) {
        await this.auth_.signUp({
            username: email,
            password,
            attributes: {
                email
            }
        });
    };

    async confirmSignUp(email: string, code: string) {
        // Verification by email or SMS
        await this.auth_.confirmSignUp(email, code);
    };
}
