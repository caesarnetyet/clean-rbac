import {HttpClient} from "@angular/common/http";
import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {BehaviorSubject, catchError, from, map, Observable, of, tap} from "rxjs";
import {User, UserResponse} from "../auth.contract";
import {ToastService} from "../toast/toast.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$ = new BehaviorSubject<User | null>(null)

  constructor(private http: HttpClient,
              private router: Router,
              private toast: ToastService) { }

  fetchUser(): Observable<boolean> {
    return this.http.get<UserResponse>('/user').pipe(
        map(response => {
          this.user$.next( {
            id: response.id,
            email: response.email,
            name: response.name,
            role: response.roles[0].id
          })
          return true
        }),

       catchError(() => {
            this.toast.error("Sesión expirada, por favor inicie sesión nuevamente.")
            from(this.router.navigate(['/auth/login']))

            return of(false)
       })
    )
  }

  logout() {
      this.http.get('/logout', {}).subscribe(() => {
          this.user$.next(null)
          localStorage.removeItem('token')
          this.toast.info("Sesión Cerrada correctamente")
          from(this.router.navigate(['/auth/login']))
    })
  }
}
