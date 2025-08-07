import {Component, Input, Output, EventEmitter, inject} from '@angular/core';
import {Router} from '@angular/router';
import {PathsEnum} from '../../../shared/enums/paths.enum';
import {IconEnum} from '../../../shared/enums/icon.enum';
import {NgClass} from '@angular/common';
import {AuthService} from '../../../features/auth/providers/auth.service';

@Component({
    selector: 'app-menu',
    imports: [NgClass],
    templateUrl: './menu.html',
    styleUrl: './menu.scss'
})
export class Menu {
    @Input() isOpen = false;
    @Output() closeMenu = new EventEmitter<void>();

    private readonly authService = inject(AuthService);

    menuItems = [
        {
            label: 'Panel Principal',
            path: PathsEnum.dashboard,
            icon: IconEnum.DASHBOARD
        },
        {
            label: 'Clientes',
            path: PathsEnum.customers,
            icon: IconEnum.CUSTOMERS
        },
        {
            label: 'Afiliados',
            path: PathsEnum.affiliates,
            icon: IconEnum.AFFILIATES
        },
        {
            label: 'Vehículos',
            path: PathsEnum.vehicles,
            icon: IconEnum.VEHICLES
        },
        {
            label: 'Tarifas',
            path: PathsEnum.rates,
            icon: IconEnum.RATES
        },
        {
            label: 'Monitoreo en Vivo',
            path: PathsEnum.liveMonitoring,
            icon: IconEnum.LIVE_MONITORING
        },
        {
            label: 'Historial de Viajes',
            path: PathsEnum.tripHistory,
            icon: IconEnum.TRIP_HISTORY
        },
        {
            label: 'Calificaciones',
            path: PathsEnum.ratings,
            icon: IconEnum.RATINGS
        },
        {
            label: 'Soporte',
            path: PathsEnum.support,
            icon: IconEnum.SUPPORT
        },
        {
            label: 'Reportes',
            path: PathsEnum.reports,
            icon: IconEnum.REPORTS
        },
        {
            label: 'Configuración',
            path: PathsEnum.settings,
            icon: IconEnum.SETTINGS
        },
        {
            label: 'Beneficios',
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

    /**
     * Logout completo del sistema
     */
    logout(): void {
        // Cerrar el sidebar en móvil
        if (this.isOpen && window.innerWidth < 768) {
            this.closeMenu.emit();
        }
        
        // Realizar logout completo
        this.authService.logout();
        
        // Navegar al login
        this.router.navigate([PathsEnum.login]);
    }

    getLogoutIcon(): string {
        return IconEnum.LOGOUT;
    }
}
