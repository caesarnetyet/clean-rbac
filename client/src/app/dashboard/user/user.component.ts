import { Component, inject } from '@angular/core';
import { MatCard, MatCardModule } from '@angular/material/card';
import { UserService } from './user.service';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { ToastService } from '../../common/services/toast/toast.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatCard, MatCardModule, AsyncPipe, NgIf, DatePipe
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  service = inject(UserService);
  private toast = inject(ToastService)
  tasks$: Observable<any> = this.service.listAssignedTasks().pipe(
    map(data => data.data)
  )


  

  markAsDone(signedURL: string) {
      this.service.markAsDone(signedURL)
          .subscribe(() => this.refreshTask())
  }

  refreshTask() {
 this.tasks$ = this.service.listAssignedTasks().pipe()
}

}