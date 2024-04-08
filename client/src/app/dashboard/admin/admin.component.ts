import {AsyncPipe, NgIf} from "@angular/common";
import {Component, inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent} from "@angular/material/card";
import {map} from "rxjs";
import {AdminService} from "./admin.service";
import {GestionUsuariosComponent} from './gestion-usuarios/gestion-usuarios.component';
import {UserComponent} from "./user/user.component"; // Importar el componente GestionUsuariosComponent

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    GestionUsuariosComponent,
    AsyncPipe,
    MatCardContent,
    MatCard,
    MatCardActions,
    NgIf,
    MatButton,
    UserComponent,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  service = inject(AdminService);

  users$ = this.service.fetchUsers().pipe(
      map(response => response.data)
  )

  disableUser(signedURL: string) {
    this.service.disableUser(signedURL)
        .subscribe(() => this.refreshUsers());
  }

  enableUser(signedURL: string) {
      this.service.enableUser(signedURL)
          .subscribe(() => this.refreshUsers())
  }

  refreshUsers() {
    this.users$ = this.service.fetchUsers().pipe(
        map(response => response.data)
    )
  }
}
