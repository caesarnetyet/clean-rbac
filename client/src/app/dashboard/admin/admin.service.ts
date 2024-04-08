import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import { Injectable } from '@angular/core';
import {catchError, map, Observable, tap} from "rxjs";
import {ToastService} from "../../common/services/toast/toast.service";
import {ListUsersResponse} from "./admin.contracts";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private toast: ToastService) { }

  fetchUsers(): Observable<ListUsersResponse> {
    return this.http.get<ListUsersResponse>('/users').pipe(
        map(response => response),
        tap(console.log)
    )
  }

  disableUser(signedURL: string) {
    return this.http.delete(signedURL).pipe(
        catchError((error: HttpErrorResponse) => {
          this.toast.error(error.error.message)
          return []
        })
    )
  }

  enableUser(signedURL: string) {
      return this.http.put(signedURL, {}).pipe(
          catchError((error: HttpErrorResponse) => {
              this.toast.error(error.error.message)
              return []
          })
      )
  }

}
