import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { Subscription } from 'rxjs';
 
@Component({
    selector: 'error-banner',
    templateUrl: './error-banner.component.html',
    styleUrls: ['./error-banner.component.css']
})
export class ErrorBannerComponent implements OnInit {

    constructor(private form_group_: FormGroup) { };

    value_changes_sub_: Subscription;

    invalid_controls: string[] = [];

    ngOnInit() {
        this.value_changes_sub_ = this.form_group_.valueChanges.subscribe(change => {
            setTimeout(() => this.updateInvalidControls(), 0);
        });
    };

    updateInvalidControls() {
        this.invalid_controls.length = 0;
        //this.are_invalid_controls = false;
        for (let name in this.form_group_.controls) {
            let control = this.form_group_.get(name);
            //this.are_invalid_controls = control.invalid || this.are_invalid_controls;
            if (control.invalid) {
                this.invalid_controls.push(name);
            }
        }
    };

    ngOnDestroy() {
        
    };
}
