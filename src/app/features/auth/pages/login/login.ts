import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PathsEnum } from '../../../../shared/enums/paths.enum';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoadingProvider } from '../../../../shared/providers/loading.provider';
import { AuthService } from '../../providers/auth.service';
import { AdminLoginRequest } from '../../../../types/backend.types';

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
    private readonly authService = inject(AuthService);

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
            alert(`Usuario o contraseña inválidos`);
            return;
        }

        // Mostrar loading mientras se procesa el login
        this.loadingProvider.show({
            type: 'spinner',
            text: 'Iniciando sesión...',
            size: 'md',
            overlay: true
        });

        const credentials: AdminLoginRequest = {
            username: this.loginForm.value.username,
            password: this.loginForm.value.password
        };

        // Realizar login usando el servicio de APIs
        this.authService.adminLogin(credentials).subscribe({
            next: (response) => {
                // Ocultar loading y navegar inmediatamente
                this.loadingProvider.hide();
                this.goToDashboard();
            },
            error: (error) => {
                // Ocultar loading de conexión
                this.loadingProvider.hide();
                
                // Mostrar error específico
                setTimeout(() => {
                    this.loadingProvider.show({
                        type: 'dots',
                        text: `❌ ${error.message || 'Error de conexión con el servidor'}`,
                        size: 'md',
                        duration: 3000
                    });
                }, 100);
            }
        });
    }



    goToDashboard(): void {
        this.router.navigate([PathsEnum.dashboard]);
    }

}
