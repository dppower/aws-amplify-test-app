import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ControlContainer, FormGroupDirective, FormGroup, FormControl } from "@angular/forms";
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions } from "@angular/material";
import { Subscription } from 'rxjs';
import { filter } from "rxjs/operators";

export const CustomTooltipDefaults: MatTooltipDefaultOptions = {
    showDelay: 500,
    hideDelay: 500,
    touchendHideDelay: 1000
};

@Component({
    selector: 'input-tooltip',
    templateUrl: './input-tooltip.component.html',
    styleUrls: ['./input-tooltip.component.css'],
    providers: [
        { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: CustomTooltipDefaults }
    ],
    viewProviders: [
        { provide: ControlContainer, useExisting: FormGroupDirective }
    ]
})
export class InputTooltipComponent implements OnInit {

    @Input() label: string;

    @Input("name") control_name: string;

    onChange: (value: any) => void;

    onTouched: (value?: any) => void;

    disabled: boolean;

    form_group: FormGroup;

    error_sub_: Subscription;
    
    get error_message() {
        let message = "";
        let control = this.form_group.get(this.control_name);
        let valid = control.valid;
        if (!valid) {
            let errors = control.errors;
            // for (let error in errors) {
            //     message += errors[error];
            // }
            message = JSON.stringify(errors, null, 2);
        }
        return message;
    }

    //private is_control_valid_ = false;

    constructor(
        private parent_form_directive_: FormGroupDirective
    ) { 

    };

    ngOnInit() { 
        this.form_group = this.parent_form_directive_.form;

        // this.form_group.get(this.control_name).statusChanges.subscribe(event => {
        //     this.is_control_valid_ = event === "VALID";
        // });
        // .pipe(
        //     filter(status => status ==)
        // )
    };
}
