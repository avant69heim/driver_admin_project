import { Component, Input } from '@angular/core';
import { IconEnum } from '../../enums/icon.enum';

@Component({
  selector: 'app-icon',
  imports: [],
  template: `
    <svg 
      [class]="cssClass" 
      fill="currentColor" 
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true">
      <path [attr.d]="iconPath"/>
    </svg>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
    svg {
      display: block;
      width: 100%;
      height: 100%;
    }
  `]
})
export class IconComponent {
  @Input() icon!: IconEnum;
  @Input() cssClass: string = 'w-6 h-6';

  get iconPath(): string {
    return this.icon;
  }
}