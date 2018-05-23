import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StripeService } from './stripe.service';
import { CardInputComponent } from './card-input.component';
import { AwsAppSyncService } from '../../aws-appsync/aws-appsync.service';
import sendTestCharge, { SendTestChargeResponse } from '../../graphql/queries/send-test-charge';

@Component({
    selector: 'payment-form',
    templateUrl: './payment-form.component.html',
    styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {

    @ViewChildren(CardInputComponent) card_inputs: QueryList<CardInputComponent>; 

    form_group: FormGroup;

    form_submitting = false;

    constructor(private stripe_service_: StripeService, private app_sync_: AwsAppSyncService) { 

    }

    ngOnInit() {
        this.form_group = new FormGroup({
            "Name": new FormControl("", Validators.required),
            "Number": new FormControl(),
            "Expiry": new FormControl(),
            "CVC": new FormControl()
        });
    };

    async onSubmit() {
        this.form_submitting = true;
        let name = this.form_group.value["Name"];

        let { token, error } = await this.stripe_service_.stripe.createToken(this.card_inputs.first.element, {
            name
        })

        if (error) {
            console.log(error);
        }
        else if (token) {
            console.log(token);
            this.app_sync_.client.watchQuery<SendTestChargeResponse>({
                query: sendTestCharge,
                variables: {
                    id: token.id
                }
            }).subscribe(({data, errors}) => {
                console.log(`send charge response: ${data.sendStripeCharge.result}`);                          
                this.form_submitting = false;
            })
        }
    };

    isButtonDisabled() {
        return !this.form_group.valid || this.form_submitting;
    }

}
