import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AwsAuthService } from "./aws-auth.service";

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private router_: Router, private auth_service_: AwsAuthService) { };

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log("testing route");
        
        return new Promise((resolve, reject) => { setTimeout(() => resolve(), 1000)})
        .then(() => this.auth_service_.auth.currentAuthenticatedUser())
        .then(user => {
            return true;
        })
        .catch(err => {
            this.router_.navigate(["/auth/sign-in"]);
            return false
        });
    };
}
