// Tipos que coinciden con el backend EDV
export interface AdminLoginRequest {
  username: string;
  password: string;
}

export interface AdminLoginResponse {
  success: boolean;
  accessToken: string;
  admin: {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    isOwner: boolean;
    permissions: AdminPermission[];
    isActive: boolean;
    lastLoginAt?: Date;
  };
  expiresIn: number;
}

export interface AdminProfileResponse {
  success: boolean;
  admin: {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    isOwner: boolean;
    permissions: AdminPermission[];
    isActive: boolean;
    lastLoginAt?: Date;
    createdAt: Date;
    updatedAt: Date;
  };
}



// Tipos de permisos del admin (según el backend)
export type AdminPermission =
  | 'read_users'
  | 'create_users'
  | 'update_users'
  | 'delete_users'
  | 'read_partners'
  | 'create_partners'
  | 'update_partners'
  | 'delete_partners'
  | 'read_trips'
  | 'update_trips'
  | 'read_admin'
  | 'create_admin'
  | 'update_admin'
  | 'delete_admin'
  | 'system_settings';

// Tipos de usuario del backend
export type UserType = 'client' | 'partner';

// Respuesta estándar de la API
export interface BackendApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  details?: any[];
}

// Error response del backend
export interface BackendErrorResponse {
  success: false;
  error: string;
  details?: any[];
}

// Usuario del backend
export interface BackendUser {
  id?: string;
  _id?: string;
  firstName: string;
  lastName?: string;
  email?: string;
  userType?: UserType[];
  role?: string;
  permissions?: AdminPermission[];
}
