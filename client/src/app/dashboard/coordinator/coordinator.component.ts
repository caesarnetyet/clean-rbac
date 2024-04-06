import {AsyncPipe} from "@angular/common";
import {Component, inject} from '@angular/core';
import {ToastService} from "../../common/services/toast/toast.service";
import {CoordinatorService} from "./coordinator.service";

@Component({
  selector: 'app-coordinator',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './coordinator.component.html',
  styleUrl: './coordinator.component.css'
})
export class CoordinatorComponent {
  private service = inject(CoordinatorService)
  private toast = inject(ToastService)
  tasks$ = this.service.listTasks()

  ngOnInit() { }

  deleteTask(deleteUrl: string) {
    this.service.deleteTask(deleteUrl)
        .subscribe((response: any) => this.toast.success(response.message))
  }
}
