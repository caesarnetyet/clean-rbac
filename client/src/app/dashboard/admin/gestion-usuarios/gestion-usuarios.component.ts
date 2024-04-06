import {NgIf} from "@angular/common";
import { Component } from '@angular/core';
import {MatButton, MatButtonModule, MatFabButton} from "@angular/material/button";
import { MatInputModule, MatInput } from '@angular/material/input';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatIcon, MatIconModule } from '@angular/material/icon'; // Importa MatIconModule
import { MatTableModule, MatTable } from '@angular/material/table';
import {MatDivider, MatDividerModule} from '@angular/material/divider';
import { AgregarUsuarioComponent } from "./agregar-usuario/agregar-usuario.component";
import { EditarUsuarioComponent } from "./editar-usuario/editar-usuario.component";
import { EliminarUsuarioComponent } from "./eliminar-usuario/eliminar-usuario.component";
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContainer, MatDialogModule } from "@angular/material/dialog";

@Component({
  selector: 'app-gestion-usuarios',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    MatFormFieldModule, 
    MatFormField,
    MatDialogClose,
    MatDialogActions, MatDialogContainer, MatDialogModule,
    MatInput,
    MatInputModule,
    MatIcon,
    MatIconModule,
    MatTableModule,
    MatTable,
    MatDividerModule,
    MatDivider,
    MatButton, MatFabButton,
    AgregarUsuarioComponent, EditarUsuarioComponent, EliminarUsuarioComponent,
    MatButtonModule, MatDividerModule,
    MatButton,
  ],
  templateUrl: './gestion-usuarios.component.html',
  styleUrl: './gestion-usuarios.component.css'
})
export class GestionUsuariosComponent {

  displayedColumns: string[] = ['id', 'name', 'email', 'actions'];
  dataSource = new MatTableDataSource<any>([
    { id: 1, name: 'Usuario 1', email: 'greciafer@gmail.com' },
    { id: 2, name: 'Usuario 2', email: 'greciafer@gmail.com' },
    { id: 3, name: 'Usuario 3', email: 'greciafer@gmail.com' }
  ]);

  mostrarFormulario = false;
  crearUsuarioFormulario = '';
  tipoFormulario = '';
  nombreUsuario = '';

  constructor(public dialog: MatDialog) {}

  abrirFormulario(tipo: string, usuario?: any): void {
    switch (tipo) {
      case 'nuevo':
        this.abrirModalNuevoUsuario();
        break;
      case 'editar':
        this.abrirModalEditarUsuario(usuario);
        break;
      case 'eliminar':
        this.abrirModalEliminarUsuario(usuario);
        break;
      default:
        console.error('Tipo de formulario no válido');
        break;
    }
  }

  abrirModalNuevoUsuario(): void {
    const dialogRef = this.dialog.open(AgregarUsuarioComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El formulario para nuevo usuario se cerró');
    });
  }

  abrirModalEditarUsuario(usuario: any): void {
    const dialogRef = this.dialog.open(EditarUsuarioComponent, {
      width: '300px',
      data: usuario
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El formulario para editar usuario se cerró');
    });
  }

  abrirModalEliminarUsuario(usuario: any): void {
    const dialogRef = this.dialog.open(EliminarUsuarioComponent, {
      width: '300px',
      data: usuario
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El formulario para eliminar usuario se cerró');
    });
  }
}