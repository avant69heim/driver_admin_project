import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import {Header} from "./core/components/header/header";

import {Menu} from "./core/components/menu/menu";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, Header, Menu],
    templateUrl: './app.html',
    styleUrl: './app.scss'
})
export class App implements OnInit {
    isSidebarOpen = false;

    constructor(
        private router: Router
    ) {
    }

    ngOnInit(): void {
        initFlowbite();
    }

    showHeader() {
        let isLogin: boolean = this.router.url.includes('login');

        return !isLogin;
    }

    toggleSidebar(): void {
        this.isSidebarOpen = !this.isSidebarOpen;
    }
}
