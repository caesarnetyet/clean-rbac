import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  success(message: string) {
    alert("Success: " + message)
  }

  info(message: string) {
    alert("Info: " + message)
  }

  warning(message: string) {
      alert("Warning: " + message)
   }

  error(message: string) {
      alert("Error: " + message)
  }

}
