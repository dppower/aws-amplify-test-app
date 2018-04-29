import { Injectable } from "@angular/core";

import { BehaviorSubject } from "rxjs/BehaviorSubject";

import Amplify, { Auth, AuthClass } from "aws-amplify";
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

    get auth_state() {
        return this.auth_state_.getValue();
    };

    set auth_state(state: AuthState) {
        this.auth_state_.next(state);
    };

    private auth_: AuthClass;
    private auth_state_ = new BehaviorSubject<AuthState>({ state: "signed-out", user: null });

    readonly auth_state_changes = this.auth_state_.asObservable();

    constructor() {
        Amplify.configure(auth_config);
        this.auth_ = Auth;
        this.checkUser();

        this.auth_state_changes.subscribe((change) => {
            console.log(`user: ${JSON.stringify(change.user)}, state: ${change.state}.`)
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

        console.log(user);
        //console.log(`user: ${JSON.stringify(user)}.`);
        if (user.challengeName) {
            console.log(user.challengeName);
        }
    };

    async confirmSignIn() {
        // MFA is enabled

    };

    async signOut() {

    };

    async signUp(username: string, password: string, email: string) {
        await this.auth_.signUp({
            username,
            password,
            attributes: {
                email
            }
        });
    };

    async confirmSignUp() {
        // Verification by email or SMS
    };
}
