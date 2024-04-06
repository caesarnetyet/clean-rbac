import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, NgModel } from '@angular/forms';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-eliminar-usuario',
  standalone: true,
  imports: [
    MatFormField, MatFormFieldModule,
    MatInput, MatInputModule,
    MatButton, MatButtonModule,
    FormsModule,
    MatDividerModule,
  ],
  templateUrl: './eliminar-usuario.component.html',
  styleUrl: './eliminar-usuario.component.css'
})
export class EliminarUsuarioComponent {
  constructor(
    public dialogRef: MatDialogRef<EliminarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  guardarUsuario(): void {
    // Lógica para guardar el usuario
    this.dialogRef.close();
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
