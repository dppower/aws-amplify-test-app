import { Component, OnInit, ComponentRef, Injector, ViewContainerRef } from '@angular/core';

import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";
import { AwsAuthService } from "../aws-auth.service";
import { Router } from "@angular/router";
import { passwordValidator } from '../validators/password-validator';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { ErrorBannerComponent } from '../input-tooltip/error-banner.component';

@Component({
    selector: 'auth-form',
    templateUrl: './auth-form.component.html',
    styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent implements OnInit {

    form_group: FormGroup;

    private active_component_: { next: () => void };

    private overlay_ref_: OverlayRef;

    constructor(private auth_service_: AwsAuthService, private router_: Router, 
        private cdk_overlay_: Overlay, private injector_: Injector, private view_container_: ViewContainerRef
    ) { };

    ngOnInit() {
        this.form_group = new FormGroup({
            "Email": new FormControl("", [Validators.required, Validators.email]),
            "Password": new FormControl("", [Validators.required, Validators.minLength(8), passwordValidator]),
        });
        this.createOverlay();
    };

    setActive(component) {
        this.active_component_ = component;
    };

    onSubmit() {
        this.active_component_.next();
    };

    createOverlay() {
        this.overlay_ref_ = this.cdk_overlay_.create({
            width: "40%",
            height: "25%",
            hasBackdrop: false,
            positionStrategy: this.cdk_overlay_.position().global().centerHorizontally()           
        });
        let injector = Injector.create([{provide: FormGroup, useValue: this.form_group}]);
        const errorBannerOverlay = new ComponentPortal(ErrorBannerComponent, this.view_container_, injector);
        this.overlay_ref_.attach(errorBannerOverlay);
    }

    ngOnDestroy() {
        this.overlay_ref_.dispose();
    }
}
