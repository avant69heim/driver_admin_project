import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PathsEnum } from '../../../../shared/enums/paths.enum';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoadingProvider } from '../../../../shared/providers/loading.provider';

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
        private loadingProvider: LoadingProvider
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

    async validateForm(): Promise<void> {
        let isInvalidForm: boolean = this.loginForm.invalid;
        if (isInvalidForm) {
            alert(`Invalid username or password`);
            return;
        }

        // Show loading while processing login
        this.loadingProvider.show({
            type: 'spinner',
            text: 'Signing in to EDV Route...',
            size: 'md',
            overlay: true
        });

        try {
            // Simulate API call delay
            await this.simulateLoginProcess();

            // Success - navigate to dashboard
            this.goToDashboard();
            this.loginForm.reset();

        } catch (error) {
            console.error('Login failed:', error);

            // Show error loading briefly
            this.loadingProvider.show({
                type: 'dots',
                text: 'Login failed. Please try again.',
                size: 'md',
                duration: 2000 // Auto-hide after 2 seconds
            });

        } finally {
            // Hide loading after success
            setTimeout(() => {
                this.loadingProvider.hide();
            }, 1000);
        }
    }

    private simulateLoginProcess(): Promise<void> {
        return new Promise((resolve, reject) => {
            // Simulate network delay (1.5 seconds)
            setTimeout(() => {
                // 90% success rate for demo
                if (Math.random() > 0.1) {
                    resolve();
                } else {
                    reject(new Error('Invalid credentials'));
                    this.goToDashboard();
                }
            }, 1500);
        });
    }

    goToDashboard(): void {
        this.router.navigate([PathsEnum.dashboard]);
    }

}
