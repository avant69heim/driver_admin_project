import { Component } from '@angular/core';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { IconEnum } from '../../../../shared/enums/icon.enum';

@Component({
  selector: 'app-customers',
  imports: [IconComponent],
  templateUrl: './customers.html',
  styleUrl: './customers.scss'
})
export class Customers {
  // Icon references for template
  icons = {
    CUSTOMERS: IconEnum.CUSTOMERS,
    CHECK_CIRCLE: IconEnum.CHECK_CIRCLE,
    EXCLAMATION_TRIANGLE: IconEnum.EXCLAMATION_TRIANGLE,
    USERS: IconEnum.USERS
  };
}