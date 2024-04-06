import { Component } from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenav, MatSidenavContainer, MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbar} from "@angular/material/toolbar";
import {Router, RouterOutlet} from "@angular/router";
import {UserRole} from "../common/services/auth.contract";
import {AuthService} from "../common/services/auth/auth.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbar,
    MatSidenavContainer,
    MatSidenav,
    MatSidenavModule,
    MatIconModule,
    MatButton,
    MatIconButton
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  user = this.authService.user$

  constructor(private authService: AuthService,
              private router: Router) {

  }

 async ngOnInit() {
    if (!this.user.value) this.authService.fetchUser().subscribe()

     switch (this.user.value?.role) {
         case UserRole.Admin:
            await this.router.navigate(['dashboard/admin'])
            break
         case UserRole.Coordinator:
            await this.router.navigate(['dashboard/coordinator'])
            break
         case UserRole.User:
             await this.router.navigate(['dashboard/guest'])
     }

  }

  onLogout() {
    this.authService.logout()
  }
}
