import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PathsEnum } from '../../../../shared/enums/paths.enum';

@Component({
  selector: 'app-affiliates',
  imports: [],
  templateUrl: './affiliates.html',
  styleUrl: './affiliates.scss'
})
export class Affiliates {
  private readonly router = inject(Router);

  /**
   * Navegar al formulario de registro de afiliados
   */
  goToAffiliateRegister(): void {
    this.router.navigate([PathsEnum.affiliatesRegister]);
  }
}