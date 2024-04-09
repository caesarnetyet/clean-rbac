import {Component, inject, OnInit, signal} from '@angular/core';
import {MatButton} from "@angular/material/button";
import { MatCard, MatCardModule } from '@angular/material/card';
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import { UserService } from './user.service';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { map, switchMap} from 'rxjs';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatCard,
    MatCardModule,
    AsyncPipe,
    NgIf, DatePipe, MatButton, MatProgressSpinner,
    MatButton
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
  service = inject(UserService);
  tasks$ = signal([] as any[]);

  ngOnInit() {
    this.service.listAssignedTasks().pipe(
        map(data => data.data)
    ).subscribe(tasks => {
      this.tasks$.set(tasks)
    })
  }

  markAsDone(signedURL: string) {
    this.service.markAsDone(signedURL).pipe(
        switchMap(() => this.service.listAssignedTasks()),
        map(data => data.data)
    ).subscribe(updatedTasks => {
        this.tasks$.set(updatedTasks)
    });
  }

}