import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {catchError, from, Observable, of, tap} from "rxjs";
import {ToastService} from "../../common/services/toast/toast.service";
import {RegisterRequest, RegisterResponse, RegisterValidationErrors} from "./register.contracts";

@Injectable({
  providedIn: 'root'
})

export class RegisterService {


  constructor(
      private http: HttpClient,
      private toast: ToastService,
      private router: Router) { }

  register(data: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>('/register', data).pipe(
        tap({
          next: (data) => {
              this.toast.success(data.message)
              from(this.router.navigate(['/auth/login']))
          },
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status !== 422) {
            this.toast.error((error.error.message))
            throw error
          }
          const validationErrors: RegisterValidationErrors = error.error.errors;
          return of({message: error.error.message,errors:validationErrors});
        })
    )
  }
}
