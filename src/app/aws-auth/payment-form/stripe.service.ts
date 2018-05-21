import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class StripeService {

    readonly elements: Stripe.Elements;
    readonly stripe: Stripe;

    constructor() { 
        this.stripe = Stripe(environment.stripe);
        this.elements = this.stripe.elements();
    };
}
