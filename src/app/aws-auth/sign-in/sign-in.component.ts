import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

    form_group: FormGroup;

    constructor() { };

    ngOnInit() {
        this.form_group = new FormGroup({
            username: new FormControl(""),
            password: new FormControl("")
        });
    };
}
