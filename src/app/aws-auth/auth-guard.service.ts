import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Auth } from "aws-amplify";

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor() { };

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return Auth.currentSession().then(session => true).catch(err => false);
    };
}
