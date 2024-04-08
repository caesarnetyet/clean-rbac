import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {catchError, map, Observable} from "rxjs";
import {ToastService} from "../../common/services/toast/toast.service";
import { Task } from '../coordinator/coordinator';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient, private toast: ToastService) { }

  listAssignedTasks(): Observable<any> {
    return this.http.get<any>('/assigned-tasks').pipe(
        catchError(err => {
          this.toast.error(err.error.message)
          return err
        })
    )
  }

  markAsDone(signedURL: string) {
      return this.http.put(signedURL, {}).pipe(
          catchError((error: HttpErrorResponse) => {
              this.toast.error(error.error.message)
              return []
          })
      )
  }

}
