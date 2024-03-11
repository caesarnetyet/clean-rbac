import {NgIf} from "@angular/common";
import {Component} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {RouterLink} from "@angular/router";
import {RecaptchaModule} from "ng-recaptcha";
import {environment} from "../../../environments/environment";
import {equalTo} from "./common/validators/equal-to";
import {RegisterRequest, RegisterValidationErrors} from "./register.contracts";
import {RegisterService} from "./register.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf,
    RecaptchaModule,
    MatFormFieldModule,
    MatInputModule,
    MatButton
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  recaptchaVerified = false;
  siteKey = environment.siteKey;

  registerForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password_confirmation: ['', [Validators.required, equalTo('password')]]
  })


  constructor(private formBuilder: FormBuilder, private service: RegisterService) {}

  controlHasErrors(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    if (!control) return false

    return (control.dirty || control.touched) && control.invalid;
  }

  getControlErrorMessage (controlName: string): string {
    const control = this.registerForm.get(controlName);
    if (!control) return '';

    for (const key in control.errors) switch (key) {
      case 'required':
        return 'Este campo es requerido';
      case 'minlength':
        return `El campo debe tener al menos ${control.errors[key]['requiredLength']} caracteres`;
      case 'email':
        return 'El email no es válido';
      case 'equalTo':
        return 'Las contraseñas no coinciden';
      case 'server':
        return control.errors[key];
      default:
        break;
    }

    return '';
  }


  handleSubmit() {
    if (this.registerForm.invalid || !this.recaptchaVerified) return;
    this.service.register(this.registerForm.value as RegisterRequest)
        .subscribe( response => {
          if (response.errors) {
            this.handleServerValidationErrors(response.errors)
            return
          }
        })
  }




  handleServerValidationErrors(errors: RegisterValidationErrors) {
    for (const key in errors) {
        this.registerForm.get(key)?.setErrors({server: errors[key]})
    }
  }

  onRecaptchaResolved() {
    this.recaptchaVerified = true;
  }
}