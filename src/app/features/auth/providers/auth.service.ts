import { Injectable, inject } from '@angular/core';
import { Observable, BehaviorSubject, tap, throwError, catchError } from 'rxjs';
import { AuthApiService } from '../../../apis/auth/auth.service';
import { 
  AdminLoginRequest, 
  AdminLoginResponse
} from '../../../types/backend.types';

/**
 * Servicio de autenticación que maneja el estado de la sesión
 * Utiliza AuthApiService para las peticiones a la base de datos
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly authApiService = inject(AuthApiService);
  
  // Estado de autenticación
  private readonly isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private readonly currentAdminSubject = new BehaviorSubject<any>(null);
  
  public readonly isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  public readonly currentAdmin$ = this.currentAdminSubject.asObservable();

  constructor() {
    this.checkExistingAuth();
  }

  /**
   * Verificar si hay una sesión existente al inicializar
   */
  private checkExistingAuth(): void {
    const token = this.getStoredToken();
    const admin = this.getStoredAdmin();
    
    if (token && admin) {
      // Verificar si el token sigue siendo válido obteniendo el perfil
      this.getAdminProfile().subscribe({
        next: () => {
          // Session restored successfully
        },
        error: () => {
          this.clearAuthData();
        }
      });
    }
  }

  /**
   * Login de administrador usando AuthApiService
   */
  adminLogin(credentials: AdminLoginRequest): Observable<AdminLoginResponse> {
    return this.authApiService.adminLogin(credentials).pipe(
      tap((loginData: AdminLoginResponse) => {
        // Guardar datos en localStorage
        this.storeAuthData(loginData.accessToken, loginData.admin);
        
        // Actualizar estados
        this.isAuthenticatedSubject.next(true);
        this.currentAdminSubject.next(loginData.admin);

      })
    );
  }

  /**
   * Obtener perfil del administrador actual usando AuthApiService
   */
  getAdminProfile(): Observable<any> {
    const token = this.getStoredToken();
    if (!token) {
      this.logout();
      return throwError(() => new Error('No authentication token found'));
    }

    return this.authApiService.getAdminProfile(token).pipe(
      tap((adminData: any) => {
        this.currentAdminSubject.next(adminData);
        this.isAuthenticatedSubject.next(true);
      }),
      catchError((error) => {
        if (error.requiresReauth || error.status === 401) {
          this.logout();
        }
        return throwError(() => error);
      })
    );
  }

  /**
   * Logout completo del sistema
   */
  logout(): void {
    const token = this.getStoredToken();
    
    // Invalidar token en el backend si existe
    if (token) {
      this.authApiService.logout(token).subscribe({
        next: () => {
          // Backend logout completed
        },
        error: (error) => {
          // Backend logout failed, continue with local cleanup
        }
      });
    }
    
    // Limpiar estado local inmediatamente
    this.clearAuthData();
    this.isAuthenticatedSubject.next(false);
    this.currentAdminSubject.next(null);
  }



  /**
   * Obtener token del localStorage
   */
  getStoredToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('edv_auth_token');
    }
    return null;
  }

  /**
   * Obtener admin del localStorage
   */
  getStoredAdmin(): any {
    if (typeof window !== 'undefined') {
      const adminData = localStorage.getItem('edv_current_admin');
      return adminData ? JSON.parse(adminData) : null;
    }
    return null;
  }

  /**
   * Guardar datos de autenticación
   */
  private storeAuthData(token: string, admin: any): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('edv_auth_token', token);
      localStorage.setItem('edv_current_admin', JSON.stringify(admin));
    }
  }

  /**
   * Limpiar datos de autenticación
   */
  private clearAuthData(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('edv_auth_token');
      localStorage.removeItem('edv_current_admin');
    }
  }

  /**
   * Verificar si el usuario está autenticado
   */
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  /**
   * Obtener el admin actual
   */
  getCurrentAdmin(): any {
    return this.currentAdminSubject.value;
  }
}
