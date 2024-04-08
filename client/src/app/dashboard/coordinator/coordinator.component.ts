import {AsyncPipe} from "@angular/common";
import {Component, Inject, inject} from '@angular/core';
import {ToastService} from "../../common/services/toast/toast.service";
import {CoordinatorService} from "./coordinator.service";
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatCard, MatCardModule} from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { AgregarTareaComponent } from "./agregar-tarea/agregar-tarea.component";
import { Task } from "./coordinator";
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-coordinator',
  standalone: true,
  imports: [
    RouterOutlet,
    AsyncPipe,
    MatCardModule, MatButtonModule, MatButton, MatCard, RouterLink
  ],
  templateUrl: './coordinator.component.html',
  styleUrl: './coordinator.component.css'
})
export class CoordinatorComponent {
  private service = inject(CoordinatorService)
  private toast = inject(ToastService)
  tasks$ = this.service.listTasks()
  userGuests = this.service.fetchUsers()

  ngOnInit() { }

  deleteTask(deleteUrl: string) {
    this.service.deleteTask(deleteUrl)
      .subscribe((response: any) => {
        this.toast.success(response.message);
        // Recargar la lista de tareas después de eliminar la tarea
        this.tasks$ = this.service.listTasks();
      });
  }
  // updateTask(updatedTask: string) {
  //   this.service.deleteTask(updatedTask)
  //       .subscribe((response: any) => this.toast.success(response))
  // }

  mostrarFormulario = false;
  tipoFormulario = '';

  constructor(public dialog: MatDialog) {}

  abrirFormulario(tipo: string, task?: any, action?:any): void {
    switch (tipo) {
      case 'nuevo':
        this.abrirModalNuevaTarea([]);
        break;
      case 'editar':
        console.log(task);
        this.abrirModalEditarTarea(task, action);
        break;
      
      default:
        console.error('Tipo de formulario no válido');
        break;
    }
  }

  abrirModalNuevaTarea(data: []): void {
    const dialogRef = this.dialog.open(AgregarTareaComponent, {
      width: '600px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El formulario para nueva tarea se cerró');
      this.tasks$ = this.service.listTasks();
    });
  }

  abrirModalEditarTarea(task: any, action:string): void {
    const dialogRef = this.dialog.open(AgregarTareaComponent, {
      width: '600px',
      data: [task, action],
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El formulario para editar la tarea se cerró');
      this.tasks$ = this.service.listTasks();

    });
  
  }
}
