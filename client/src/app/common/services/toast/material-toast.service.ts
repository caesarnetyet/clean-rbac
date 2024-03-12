import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MaterialToastService extends ToastService {
  config: MatSnackBarConfig = {
    horizontalPosition: 'center',
    verticalPosition: 'top', 
    panelClass: 'toast'
  }

  constructor(private _toast: MatSnackBar) {
    super();
}

override info(message: string): void {
  this._toast.open(message, 'Cerrar', this.config)
}

override success(message: string): void {
  this._toast.open(message, 'Cerrar', this.config)
}
override error(message: string): void {
  this._toast.open(message, 'Cerrar', this.config)
}
override warning(message: string): void {
  this._toast.open(message, 'Cerrar', this.config)
}
  
}
