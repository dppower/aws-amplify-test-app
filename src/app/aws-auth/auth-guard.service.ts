import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AwsAuthService } from "./aws-auth.service";

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private router_: Router, private auth_service_: AwsAuthService) { };

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.auth_service_.auth.currentSession()
        .then(session => {
            return true;
        })
        .catch(err => {
            this.router_.navigate(["/auth/sign-in"]);
            return false
        });
    };
}
