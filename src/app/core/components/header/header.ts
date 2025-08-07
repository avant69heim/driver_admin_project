import { Component, Output, EventEmitter, OnInit, Inject, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../features/auth/providers/auth.service';
import { PathsEnum } from '../../../shared/enums/paths.enum';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit {
  @Output() sidebarToggle = new EventEmitter<void>();
  
  isSidebarOpen = false;
  isUserMenuOpen = false;
  isDarkMode = false;

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeDarkMode();
    }
  }

  private initializeDarkMode() {
    // Check localStorage for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('color-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      this.isDarkMode = true;
      document.documentElement.classList.add('dark');
    } else {
      this.isDarkMode = false;
      document.documentElement.classList.remove('dark');
    }
  }

  toggleDarkMode() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.isDarkMode = !this.isDarkMode;

    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.sidebarToggle.emit();
  }

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  /**
   * Logout completo del sistema
   */
  logout(): void {
    // Cerrar el menu de usuario
    this.isUserMenuOpen = false;
    
    // Realizar logout completo
    this.authService.logout();
    
    // Navegar al login
    this.router.navigate([PathsEnum.login]);
  }
}
