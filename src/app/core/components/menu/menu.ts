import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {PathsEnum} from '../../../shared/enums/paths.enum';
import {IconEnum} from '../../../shared/enums/icon.enum';
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
            icon: IconEnum.DASHBOARD
        },
        {
            label: 'Customers',
            path: PathsEnum.customers,
            icon: IconEnum.CUSTOMERS
        },
        {
            label: 'Drivers',
            path: PathsEnum.drivers,
            icon: IconEnum.DRIVERS
        },
        {
            label: 'Vehicles',
            path: PathsEnum.vehicles,
            icon: IconEnum.VEHICLES
        },
        {
            label: 'Rates',
            path: PathsEnum.rates,
            icon: IconEnum.RATES
        },
        {
            label: 'Live Monitoring',
            path: PathsEnum.liveMonitoring,
            icon: IconEnum.LIVE_MONITORING
        },
        {
            label: 'Trip History',
            path: PathsEnum.tripHistory,
            icon: IconEnum.TRIP_HISTORY
        },
        {
            label: 'Ratings',
            path: PathsEnum.ratings,
            icon: IconEnum.RATINGS
        },
        {
            label: 'Support',
            path: PathsEnum.support,
            icon: IconEnum.SUPPORT
        },
        {
            label: 'Reports',
            path: PathsEnum.reports,
            icon: IconEnum.REPORTS
        },
        {
            label: 'Settings',
            path: PathsEnum.settings,
            icon: IconEnum.SETTINGS
        },
        {
            label: 'Benefits',
            path: PathsEnum.benefits,
            icon: IconEnum.BENEFITS
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

    getLogoutIcon(): string {
        return IconEnum.LOGOUT;
    }
}
