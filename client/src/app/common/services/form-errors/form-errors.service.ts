import { Injectable } from '@angular/core';
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FormErrorsService {
  stubFormErrors = {
    email: [
        "Email has already been taken",
    ],
    password: [
        "Password is required",
    ]
  }
  constructor() { }
    getFormErrors() {
        return of(this.stubFormErrors);
    }
}
