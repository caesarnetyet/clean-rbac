import { catchError, from, map, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastService } from '../../../common/services/toast/toast.service';
import { Observable, tap } from 'rxjs';
import { NewTaskResponse, TaskNewValidationErrors } from './agregar-tarea';

@Injectable({
  providedIn: 'root'
})
export class AgregarTareaService {

  constructor(
    private http: HttpClient,
    private toast: ToastService,
    ) { }

    listGuests(): Observable<any> {
      return this.http.get<any[]>('/guests').pipe(
        map(users => users.map(user => ({ id: user.id, name: user.name, email: user.email })))
      );
    }
  fetchUsers(): Observable<any>{
    return this.http.get<any>('/guests').pipe(
      map(data => data.data),
      catchError((error: HttpErrorResponse)=> {
        if (error.status !== 422) {
          this.toast.error((error.error.message))
          throw error
        }
        const validationErrors: TaskNewValidationErrors = error.error.errors;
        return of({message: error.error.message,errors:validationErrors});
      }
    )
  )}
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
  listTasks(): Observable<any> {
    return this.http.get('/tasks').pipe(
        map((res: any) => res.data),
        catchError(err => {
          this.toast.error(err)
          return err
        })
    )
  }
  
}
