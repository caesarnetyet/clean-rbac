import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-agregar-usuario',
  standalone: true,
  imports: [
    MatFormField, MatFormFieldModule,
    MatInput, MatInputModule,
    MatButton, MatButtonModule,
    FormsModule,
    MatDivider, MatDividerModule,
  ],
  templateUrl: './agregar-usuario.component.html',
  styleUrl: './agregar-usuario.component.css'
})
export class AgregarUsuarioComponent {
  constructor(
    public dialogRef: MatDialogRef<AgregarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  // Añade el objeto para el nuevo usuario
  newUser: any = {};

  // Añade el método para guardar el nuevo usuario
  guardarNuevoUsuario(): void {
    // Lógica para guardar el nuevo usuario
    this.dialogRef.close(this.newUser);
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
