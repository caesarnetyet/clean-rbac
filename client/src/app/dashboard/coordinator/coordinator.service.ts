import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import { Injectable } from '@angular/core';
import {catchError, map, Observable, throwError} from "rxjs";
import {ToastService} from "../../common/services/toast/toast.service";
import { Task } from "./coordinator";
import { TaskNewValidationErrors } from "./agregar-tarea/agregar-tarea";


@Injectable({
  providedIn: 'root'
})
export class CoordinatorService {

  constructor(
      private http: HttpClient,
      private toast: ToastService
  ) { }

  listTasks(): Observable<any> {
    return this.http.get('/tasks').pipe(
        map((res: any) => res.data),
        catchError(err => {
          this.toast.error(err)
          return err
        })
    )
  }
  listGuests(): Observable<any> {
    return this.http.get<any[]>('/guests').pipe(
      map(users => users.map(user => ({ id: user.id, name: user.name, email: user.email })))
    );
  }
  fetchUsers(): Observable<any>{
    return this.http.get<any>('/guests').pipe(
      map(data => data.data),
      catchError(err => {
        this.toast.error(err)
        return err
      })
  )}

  createTask(task: object): Observable<unknown> {
    return this.http.post('/tasks', task).pipe(
        catchError(err => {
          this.toast.error(err.error.message)
          return err
        })
    )
  }
  
  // updateHero(task: Task): Observable<unknown> {
  //   return this.http.put<Task>(this.updatedUrl, task, httpOptions)
  //     .pipe(
  //       catchError(err => {
  //         this.toast.error(err.error.message)
  //         return err
  //       })
  //     );
  // }

  updateTask(signedURL: string, bodyData: any): Observable<any> {
    return this.http.put(signedURL, bodyData)
      .pipe(
        catchError(err => {
          console.error('Error updating task:', err);
          this.toast.error(err.error.message)
          return err
        })
      );
  }

  deleteTask(signedURL: string): Observable<unknown> {
    return this.http.delete(signedURL).pipe(
        catchError(err => {
          this.toast.error(err.error.message)
          return err
        })
    )
  }
}
