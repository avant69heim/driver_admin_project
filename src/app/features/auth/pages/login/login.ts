import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PathsEnum } from '../../../../shared/enums/paths.enum';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    imports: [
        ReactiveFormsModule
    ],
    templateUrl: './login.html',
    styleUrl: './login.scss'
})
export class Login {

    loginForm: FormGroup = new FormGroup({});

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
    ) {
        this.createForm();
    }

    private createForm() {
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.minLength(3), Validators.maxLength(100), Validators.required]],
            password: ['', [Validators.minLength(6), Validators.maxLength(15), Validators.required]],
            remember: [false],
        });
    }

    validateForm(): void {
        let isInvalidForm: boolean = this.loginForm.invalid;
        if (isInvalidForm) {
            alert(`Invalid username or password`);
            return;
        }
        this.goToDashboard();
        this.loginForm.reset();
    }

    goToDashboard(): void {
        this.router.navigate([PathsEnum.dashboard]);
    }

}
