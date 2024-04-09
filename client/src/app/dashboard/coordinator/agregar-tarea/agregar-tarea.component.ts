import { CoordinatorService } from './../coordinator.service';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, Inject, inject } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatError, MatInput, MatInputModule, MatLabel } from '@angular/material/input';
import { AgregarTareaService } from './agregar-tarea.service';
import {TaskNewValidationErrors } from './agregar-tarea';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '../../../common/services/toast/toast.service';
import { Task } from '../coordinator';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';


@Component({
  selector: 'app-agregar-tarea',
  standalone: true,
  imports: [
    MatInput, MatInputModule,
    MatLabel, MatButton, MatButtonModule, MatError,
    ReactiveFormsModule, RouterLink, NgIf, MatFormFieldModule,
    FormsModule,
    MatAutocompleteModule,
    AsyncPipe,
  ],
  templateUrl: './agregar-tarea.component.html',
  styleUrl: './agregar-tarea.component.css'
})
export class AgregarTareaComponent {
  private service = inject(AgregarTareaService)
  private addTaskService = inject(CoordinatorService)
  private toast = inject(ToastService)
  tasks$ = this.service.listTasks()

  //guests$ = this.service.listGuests()
  listControl = new FormControl('');
  users: any[]
  selectedUser: string
  ngOnInit() {
    this.userGuests.subscribe((users)=>{
      this.users = users;
    })
    this.listControl.valueChanges.subscribe(value => {
      this.tasknewForm.get('guest_id')?.setValue(value);
    })
   }
   constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<AgregarTareaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any[]) {
      this.users = [];
      this.selectedUser = ""
    }
  tasknewForm = this.formBuilder.group({
    title: [this.data[0]?.title || '', [Validators.required, Validators.minLength(3)]],
    body: [this.data[0]?.body || '', [Validators.required, Validators.minLength(3)]],
    guest_id: [this.data[0]?.user.id || '', [Validators.required]]
  })
  userGuests = this.service.fetchUsers()

  controlHasErrors(controlName: string): boolean {
    const control = this.tasknewForm.get(controlName);
    if (!control) return false

    return (control.dirty || control.touched) && control.invalid;
  }
  getControlErrorMessage (controlName: string): string {
    const control = this.tasknewForm.get(controlName);
    if (!control) return '';

    for (const key in control.errors) switch (key) {
      case 'required':
        return 'Este campo es requerido';
      case 'minlength':
        return `El campo debe tener al menos ${control.errors[key]['requiredLength']} caracteres`;
      case 'email':
        return 'El email no es válido';
      default:
        break;
    }
    return '';
  }

  handleSubmit() {
    if(this.data[1] == 'editar'){
      console.log('Entro al editar');
      const formData = this.tasknewForm.value;
      this.addTaskService.updateTask(this.data[0].updateUrl, formData).subscribe((response: any) => {
        console.log(response);
        this.toast.success(response.message);
        // Cerrar el diálogo después de que la solicitud se complete correctamente
        this.dialogRef.close();
        // Recargar la lista de tareas después de cerrar el diálogo
        this.service.listTasks().subscribe(tasks => {
          this.tasks$ = tasks;
        });
      });
    } else {
      const formData = this.tasknewForm.value;
      this.addTaskService.createTask(formData).subscribe((response: any) => {
        console.log(response);
        this.toast.success(response.message);
        // Cerrar el diálogo después de que la solicitud se complete correctamente
        this.dialogRef.close();
        // Recargar la lista de tareas después de cerrar el diálogo
        this.service.listTasks().subscribe(tasks => {
          this.tasks$ = tasks;
        });
      });
    }
  }  
  
  cancelar(): void {
    this.dialogRef.close();
  }
}
