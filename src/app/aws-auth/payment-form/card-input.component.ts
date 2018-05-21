import { 
    Component, OnInit, Optional, Self, ElementRef, AfterViewInit, ViewChild,
    OnDestroy, Input 
} from '@angular/core';
import { ControlValueAccessor, NgControl, Validator, AbstractControl } from '@angular/forms';
import { StripeService } from './stripe.service';
import { fromEvent as rxFromEvent, Subscription } from "rxjs";

type ElementType = "cardCvc" | "cardNumber" | "cardExpiry";

interface OnChangeEvent {
    elementType: ElementType;
    error?: { type: string, message: string, code: string };
    complete: boolean;
    empty: boolean;
}

@Component({
    selector: 'card-input',
    templateUrl: './card-input.component.html',
    styleUrls: ['./card-input.component.css']
})
export class CardInputComponent implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor, Validator {

    @ViewChild("element") input: ElementRef;

    @Input("label") label: string;
    @Input("type") element_type: ElementType;

    onChange: (value: any) => void;

    onTouched: (value?: any) => void;

    disabled: boolean;

    private stripe_element_: Stripe.Element;

    private change_sub_: Subscription;
    private blur_sub_: Subscription;

    private change_event: OnChangeEvent = { complete: false, empty: true, elementType: this.element_type };

    constructor(
        @Optional() @Self() public control_dir: NgControl, private element_ref_: ElementRef,
        private stripe_service_: StripeService
    ) { 
        this.control_dir.valueAccessor = this;
    };

    ngOnInit() {
        const control = this.control_dir.control;
        let validators = control.validator ? [control.validator, this.validate] : this.validate;
        control.setValidators(validators);
        control.updateValueAndValidity();
    };

    ngAfterViewInit() {
        this.stripe_element_ = this.stripe_service_.elements.create(this.element_type, {
            classes: {
                base: "stripe",
                complete: "stripe-complete",
                empty: "stripe-empty",
                focus: "stripe-focus",
                invalid: "stripe-invalid",
                webkitAutofill: "stripe-autofill"
            },
            style: {
                base: {
                    fontSize: "16px",
                    color: "rgb(73, 80, 87)",
                    lineHeight: "1.5",
                    fontFamily: `apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,
                    "Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`
                }
            }
        });

        this.stripe_element_.mount(this.input.nativeElement);

        this.change_sub_ = rxFromEvent(this.stripe_element_, "change").subscribe((event) => {
            console.log(event);
            this.change_event = event;
            this.onChange(event);
        });

        this.blur_sub_ = rxFromEvent(this.stripe_element_, "blur").subscribe((event) => {
            this.onTouched();
        });
    };

    validate = (control: AbstractControl) => {
        if (!this.change_event.complete) {
            return { [this.label]: `Must enter a valid ${this.label}`};

        } else if (this.change_event.error) {
            return { [this.label]: this.change_event.error.message };
        }
        return null;
    };

    writeValue(value: any) {
        return; // Should not set value
    };

    registerOnChange(fn: (value: any) => void) {
        this.onChange = fn;
    };

    registerOnTouched(fn: (value: any) => void) {
        this.onTouched = fn;
    };

    setDisabledState(is_disabled: boolean) {
        this.disabled = is_disabled;
    };

    ngOnDestroy() {
        this.change_sub_.unsubscribe();
        this.blur_sub_.unsubscribe();
        this.stripe_element_.destroy();
    }
}
