import { Component, NgModule } from '@angular/core';
import { GestionUsuariosComponent } from './gestion-usuarios/gestion-usuarios.component'; // Importar el componente GestionUsuariosComponent

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    GestionUsuariosComponent,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
