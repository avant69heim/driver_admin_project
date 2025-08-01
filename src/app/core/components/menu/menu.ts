import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {PathsEnum} from '../../../shared/enums/paths.enum';
import {NgClass} from '@angular/common';

@Component({
    selector: 'app-menu',
    imports: [NgClass],
    templateUrl: './menu.html',
    styleUrl: './menu.scss'
})
export class Menu {
    @Input() isOpen = false;
    @Output() closeMenu = new EventEmitter<void>();

    menuItems = [
        {
            label: 'Dashboard',
            path: PathsEnum.dashboard,
            icon: 'M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586l-2 2V5H4v14h3v2H4a1 1 0 01-1-1V4z M10 7h10v2H10V7z M10 11h10v2H10v-2z M10 15h4v2h-4v-2z M16 13l5 5-5 5v-3h-6v-4h6v-3z'
        },
        {
            label: 'Drivers',
            path: PathsEnum.users,
            icon: 'M8 7a4 4 0 108 0 4 4 0 00-8 0z M16 21H8a1 1 0 01-1-1v-1c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v1a1 1 0 01-1 1z M10 2a1 1 0 011-1h2a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0V4h-1a1 1 0 110-2h1V2z'
        },
        {
            label: 'Vehicles',
            path: PathsEnum.profile,
            icon: 'M3 11h18v8a2 2 0 01-2 2h-1.67a3.001 3.001 0 01-5.66 0H8.33a3.001 3.001 0 01-5.66 0H2a1 1 0 01-1-1v-6a1 1 0 011-1h1v-1a1 1 0 011-1h12l4 4z M6 18a1 1 0 100-2 1 1 0 000 2z M18 18a1 1 0 100-2 1 1 0 000 2z M4 9V8h12v1H4z'
        },
        {
            label: 'Reports',
            path: '/reports',
            icon: 'M9 2a1 1 0 000 2h6a1 1 0 100-2H9z M4 5a2 2 0 012-2h1a1 1 0 000 2H6v13h12V5h-1a1 1 0 100-2h1a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5z M8 8h8v2H8V8z M8 12h8v2H8v-2z M8 16h5v2H8v-2z'
        },
        {
            label: 'Settings',
            path: PathsEnum.settings,
            icon: 'M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5A3.5 3.5 0 0 1 15.5 12A3.5 3.5 0 0 1 12 15.5M19.43 12.98C19.47 12.66 19.5 12.34 19.5 12S19.47 11.34 19.43 11.02L21.54 9.37C21.73 9.22 21.78 8.95 21.66 8.73L19.66 5.27C19.54 5.05 19.27 4.97 19.05 5.05L16.56 6.05C16.04 5.65 15.48 5.32 14.87 5.07L14.5 2.42C14.46 2.18 14.25 2 14 2H10C9.75 2 9.54 2.18 9.5 2.42L9.13 5.07C8.52 5.32 7.96 5.66 7.44 6.05L4.95 5.05C4.73 4.96 4.46 5.05 4.34 5.27L2.34 8.73C2.21 8.95 2.27 9.22 2.46 9.37L4.57 11.02C4.53 11.34 4.5 11.67 4.5 12S4.53 12.66 4.57 12.98L2.46 14.63C2.27 14.78 2.21 15.05 2.34 15.27L4.34 18.73C4.46 18.95 4.73 19.03 4.95 18.95L7.44 17.95C7.96 18.35 8.52 18.68 9.13 18.93L9.5 21.58C9.54 21.82 9.75 22 10 22H14C14.25 22 14.46 21.82 14.5 21.58L14.87 18.93C15.48 18.68 16.04 18.34 16.56 17.95L19.05 18.95C19.27 19.04 19.54 18.95 19.66 18.73L21.66 15.27C21.78 15.05 21.73 14.78 21.54 14.63L19.43 12.98Z'
        }
    ];

    constructor(private router: Router) {
    }

    isActiveRoute(path: string): boolean {
        return this.router.url === path;
    }

    navigateTo(path: string): void {
        this.router.navigate([path]);
        // Close sidebar on mobile after navigation
        if (this.isOpen && window.innerWidth < 768) {
            this.closeMenu.emit();
        }
    }

    logout(): void {
        this.router.navigate([PathsEnum.login])
    }
}
