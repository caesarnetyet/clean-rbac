import {HttpClient} from "@angular/common/http";
import { Injectable } from '@angular/core';
import {catchError, map, Observable} from "rxjs";
import {ToastService} from "../../common/services/toast/toast.service";

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

  createTask(task: object): Observable<unknown> {
    return this.http.post('/tasks', task).pipe(
        catchError(err => {
          this.toast.error(err.error.message)
          return err
        })
    )
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
