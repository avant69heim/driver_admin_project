import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { IAffiliateRegisterForm, GenderEnum } from '../../types/affiliate-register.types';
import { PathsEnum } from '../../../../shared/enums/paths.enum';

@Component({
  selector: 'app-affiliate-register',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './affiliate-register.html',
  styleUrl: './affiliate-register.scss'
})
export class AffiliateRegister {
  affiliateForm: FormGroup = new FormGroup({});
  genderOptions = Object.values(GenderEnum);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.createForm();
  }

  private createForm(): void {
    this.affiliateForm = this.formBuilder.group({
      // Datos Personales Básicos
      firstName: ['', [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
      ]],
      secondName: ['', [
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/)
      ]],
      firstLastName: ['', [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
      ]],
      secondLastName: ['', [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
      ]],
      identityCard: ['', [
        Validators.required,
        this.identityCardValidator
      ]],
      birthDate: ['', [
        Validators.required,
        this.ageValidator
      ]],
      gender: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(100)
      ]],
      phone: ['', [
        Validators.required,
        Validators.pattern(/^[\+]?[1-9][\d]{0,15}$/)
      ]],

      // Información de Conductor
      licenseNumber: ['', [
        Validators.required,
        Validators.maxLength(20)
      ]],
      licenseExpiry: ['', [
        Validators.required,
        this.futureDateValidator
      ]]
    });
  }

  /**
   * Validador personalizado para cédula de identidad
   * Formato: v-(7-8 números) o e-(sin longitud definida)
   */
  private identityCardValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null; // Deja que el required maneje el campo vacío
    }

    const value = control.value.toLowerCase().trim();

    // Patrón para v-(7-8 números)
    const vPattern = /^v-\d{7,8}$/;
    // Patrón para e-(cualquier longitud de números)
    const ePattern = /^e-\d+$/;

    if (vPattern.test(value) || ePattern.test(value)) {
      return null;
    }

    return {
      identityCardFormat: {
        message: 'Formato inválido. Use: v-1234567 o e-123456'
      }
    };
  }

  /**
   * Validador personalizado para edad (18-70 años)
   */
  private ageValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null; // Deja que el required maneje el campo vacío
    }

    const birthDate = new Date(control.value);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // Ajustar edad si no ha llegado el cumpleaños
    const actualAge = (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()))
      ? age - 1
      : age;

    if (actualAge < 18) {
      return {
        ageMin: {
          message: 'Debe tener al menos 18 años de edad'
        }
      };
    }

    if (actualAge > 70) {
      return {
        ageMax: {
          message: 'No puede tener más de 70 años de edad'
        }
      };
    }

    return null;
  }

  /**
   * Validador personalizado para fecha futura (licencia)
   */
  private futureDateValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null; // Deja que el required maneje el campo vacío
    }

    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Resetear horas para comparar solo fechas

    if (selectedDate <= today) {
      return {
        futureDate: {
          message: 'La fecha de vencimiento debe ser futura'
        }
      };
    }

    return null;
  }

  /**
   * Obtener mensaje de error para un campo específico
   */
  getFieldError(fieldName: string): string {
    const field = this.affiliateForm.get(fieldName);
    if (field && field.invalid && field.touched) {
      const errors = field.errors;
      if (errors) {
        if (errors['required']) return `${this.getFieldLabel(fieldName)} es requerido`;
        if (errors['email']) return 'Email inválido';
        if (errors['maxlength']) return `${this.getFieldLabel(fieldName)} es demasiado largo`;
        if (errors['pattern']) return `${this.getFieldLabel(fieldName)} contiene caracteres inválidos`;
        if (errors['identityCardFormat']) return errors['identityCardFormat'].message;
        if (errors['ageMin']) return errors['ageMin'].message;
        if (errors['ageMax']) return errors['ageMax'].message;
        if (errors['futureDate']) return errors['futureDate'].message;
      }
    }
    return '';
  }

  /**
   * Obtener etiqueta amigable para un campo
   */
  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      firstName: 'Primer nombre',
      secondName: 'Segundo nombre',
      firstLastName: 'Primer apellido',
      secondLastName: 'Segundo apellido',
      identityCard: 'Cédula de identidad',
      birthDate: 'Fecha de nacimiento',
      gender: 'Género',
      email: 'Email',
      phone: 'Teléfono',
      licenseNumber: 'Número de licencia',
      licenseExpiry: 'Fecha de vencimiento de licencia'
    };
    return labels[fieldName] || fieldName;
  }

  /**
   * Verificar si un campo es inválido y ha sido tocado
   */
  isFieldInvalid(fieldName: string): boolean {
    const field = this.affiliateForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  /**
   * Manejar envío del formulario
   */
  onSubmit(): void {
    if (this.affiliateForm.invalid) {
      // Marcar todos los campos como tocados para mostrar errores
      Object.keys(this.affiliateForm.controls).forEach(key => {
        this.affiliateForm.get(key)?.markAsTouched();
      });
      return;
    }

    // Preparar datos del formulario
    const formData: IAffiliateRegisterForm = {
      ...this.affiliateForm.value,
      registrationDate: new Date().toISOString()
    };

    // TODO: Aquí se conectará con el servicio para enviar los datos
    console.log('Datos del formulario:', formData);

    // Por ahora solo mostramos los datos en consola
    alert('Formulario válido. Datos enviados a consola.');

      this.affiliateForm.reset();
  }

  /**
   * Cancelar y volver a la lista de afiliados
   */
  onCancel(): void {
    this.router.navigate([PathsEnum.affiliates]);
  }
}
