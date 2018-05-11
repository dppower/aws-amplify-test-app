import { Component, OnInit, ViewChild, ElementRef, Self, Optional } from '@angular/core';
import {
    ControlValueAccessor, Validator, AbstractControl, Validators,
    NG_VALUE_ACCESSOR, NG_VALIDATORS, NgControl, ValidationErrors
} from "@angular/forms";

@Component({
    selector: 'file-input',
    templateUrl: './file-input.component.html',
    styleUrls: ['./file-input.component.css']
})
export class FileInputComponent implements OnInit, ControlValueAccessor, Validator {

    @ViewChild("input") input: ElementRef;

    onChange: (value: any) => void;

    onTouched: (value?: any) => void;

    disabled: boolean;

    constructor(
        @Optional() @Self() public control_dir: NgControl, private element_ref_: ElementRef
    ) {
        this.control_dir.valueAccessor = this;
    };

    ngOnInit() {
        const control = this.control_dir.control;
        let validators = control.validator ? [control.validator, this.validate] : this.validate;
        control.setValidators(validators);
        control.updateValueAndValidity();
    };

    validate(control: AbstractControl): ValidationErrors {
        let errors: ValidationErrors = {};
        let files: FileList = control.value;
        if (!files || files.length === 0) {
            errors["none"] = "No image file is selected"
        }

        return Object.keys(errors).length === 0 ? null : errors;
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
}
