import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {from, tap} from "rxjs";
import {ToastService} from "../../common/services/toast/toast.service";
import {LoginErrorStatus, LoginRequest, LoginResponse} from "./login.contracts";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
              private toast: ToastService,
              private router: Router) { }

  login(body: LoginRequest) {
    return this.http.post<LoginResponse>('/login', body)
      .pipe(
          tap({
              next: (response) => {
                  localStorage.setItem('token', response.token)
                  this.toast.success(response.message)
                  from(this.router.navigate(['/dashboard']))
              },
              error: (error: HttpErrorResponse) => this.handleLoginError(error)
          })
      );
  }

  private handleLoginError(error: HttpErrorResponse) {
      const errorResponse = error.error
      this.toast.error(errorResponse.message);

      switch (error.status) {
        case LoginErrorStatus.TwoFactorRequired:
            const { signature } = errorResponse
            from(this.router.navigate(['/auth/two-factor'], { queryParams: { signature } }))
            break;
    }

  }
}
