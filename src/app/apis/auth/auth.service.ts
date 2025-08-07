import { Injectable, inject } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { HttpService } from '../../services/http.service';
import {
    AdminLoginRequest,
    AdminLoginResponse,
    AdminProfileResponse,
    BackendApiResponse
} from '../../types/backend.types';

/**
 * Servicio para las peticiones de autenticación a la base de datos
 * Maneja todas las comunicaciones con el backend EDV relacionadas con auth
 */
@Injectable({
    providedIn: 'root'
})
export class AuthApiService {
    private readonly httpService = inject(HttpService);

    constructor() {
    }

    /**
     * Realizar login de administrador en el backend EDV
     * @param credentials Credenciales del administrador
     * @returns Observable con la respuesta del backend
     */
    adminLogin(credentials: AdminLoginRequest): Observable<AdminLoginResponse> {
        return this.httpService.adminLogin(credentials).pipe(
            map((response: BackendApiResponse<AdminLoginResponse>) => {
                if (response.success) {
                    // El backend EDV devuelve los datos directamente
                    const loginData = response as unknown as AdminLoginResponse;
                    return loginData;
                } else {
                    throw new Error(response.error || 'Login failed');
                }
            }),
            catchError((error) => {

                // Formatear el error para el frontend
                let errorMessage = 'Error de conexión con el servidor EDV';

                if (error.status === 401) {
                    errorMessage = 'Credenciales inválidas';
                } else if (error.status === 404) {
                    errorMessage = 'Servicio no encontrado';
                } else if (error.status === 500) {
                    errorMessage = 'Error interno del servidor';
                } else if (error.error?.error) {
                    errorMessage = error.error.error;
                } else if (error.message) {
                    errorMessage = error.message;
                }

                return throwError(() => ({
                    message: errorMessage,
                    originalError: error
                }));
            })
        );
    }

    /**
     * Obtener el perfil del administrador actual
     * @param token Token de autenticación
     * @returns Observable con los datos del perfil
     */
    getAdminProfile(token: string): Observable<any> {
        return this.httpService.getAdminProfile(token).pipe(
            map((response: BackendApiResponse<AdminProfileResponse>) => {
                if (response.success) {
                    const profileData = response as unknown as AdminProfileResponse;
                    return profileData.admin;
                } else {
                    throw new Error(response.error || 'Failed to get profile');
                }
            }),
            catchError((error) => {

                let errorMessage = 'Error al obtener el perfil';
                if (error.status === 401) {
                    errorMessage = 'Token de autenticación inválido';
                }

                return throwError(() => ({
                    message: errorMessage,
                    originalError: error,
                    requiresReauth: error.status === 401
                }));
            })
        );
    }



    /**
     * Logout - Invalidar token en el backend si es necesario
     * @param token Token de autenticación a invalidar
     * @returns Observable completado
     */
    logout(token?: string): Observable<any> {
        // TODO: Implementar invalidación de token en el backend cuando sea necesario
        // Ejemplo: return this.httpService.post('auth/logout', { token });
        
        return new Observable(observer => {
            observer.next({ success: true, message: 'Logged out successfully' });
            observer.complete();
        });
    }
}
