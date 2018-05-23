import { Component, OnInit } from '@angular/core';
import { StripeService } from './stripe.service';

@Component({
    selector: 'payment-request',
    templateUrl: './payment-request.component.html',
    styleUrls: ['./payment-request.component.css']
})
export class PaymentRequestComponent implements OnInit {

    private payment_request_: Stripe.PaymentRequest;

    constructor(private stripe_service_: StripeService) { };

    ngOnInit() {
        this.payment_request_ = this.stripe_service_.stripe.paymentRequest({
            country: "IE",
            currency: "eur",
            total: {
                label: "Demo",
                amount: 500
            }
        })
    };

    async openPaymentRequest() {
        await this.payment_request_.canMakePayment();
        this.payment_request_.show();
    }

}
