import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { StripeService } from './stripe.service';

@Component({
    selector: 'payment-form',
    templateUrl: './payment-form.component.html',
    styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {

    form_group: FormGroup;

    constructor(private stripe_service_: StripeService) { 

    }

    ngOnInit() {
        this.form_group = new FormGroup({
            "Name": new FormControl(),
            "Number": new FormControl(),
            "Expiry": new FormControl(),
            "CVC": new FormControl()
        });
    };

}
