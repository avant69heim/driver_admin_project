/**
 * Types for affiliate registration form
 */

export enum GenderEnum {
  MASCULINO = 'Masculino',
  FEMENINO = 'Femenino',
  OTRO = 'Otro'
}

export interface IAffiliateRegisterForm {
  // Datos Personales Básicos
  firstName: string;
  secondName?: string;
  firstLastName: string;
  secondLastName: string;
  identityCard: string;
  birthDate: string; // Date as string for form handling
  gender: GenderEnum;
  email: string;
  phone: string;
  
  // Información de Conductor
  licenseNumber: string;
  licenseExpiry: string; // Date as string for form handling
  
  // Variable automática (se agregará en el submit)
  registrationDate?: string;
}

export interface IAffiliateRegisterRequest {
  // Datos Personales Básicos
  firstName: string;
  secondName?: string;
  firstLastName: string;
  secondLastName: string;
  identityCard: string;
  birthDate: Date;
  gender: GenderEnum;
  email: string;
  phone: string;
  
  // Información de Conductor
  licenseNumber: string;
  licenseExpiry: Date;
  
  // Variable automática
  registrationDate: Date;
}
