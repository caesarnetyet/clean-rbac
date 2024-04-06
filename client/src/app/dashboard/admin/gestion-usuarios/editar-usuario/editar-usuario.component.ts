import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { FormsModule, NgModel } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatButton,
    FormsModule,
    MatIcon, MatIconModule,
    MatButtonModule, MatDividerModule,
  ],
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.css'
})
export class EditarUsuarioComponent {

  constructor(
    public dialogRef: MatDialogRef<EditarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public user: any
  ) {}

  guardarUsuario(): void {
    // Lógica para guardar el usuario
    this.dialogRef.close();
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
