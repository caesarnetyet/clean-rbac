import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {RouterModule} from "@angular/router";
import {RecaptchaModule} from "ng-recaptcha";
import {RecaptchaComponent} from "../../components/recaptcha/recaptcha.component";
import {LoginRequest} from "./login.contracts";
import {LoginService} from "./login.service";

@Component({
  selector: 'app-login',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        FormsModule,
        RecaptchaModule,
        RouterModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        RecaptchaComponent
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  recaptchaVerified: string | null = null
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  constructor(private service: LoginService) {}

  handleSubmit() {
   if (!this.loginForm.valid) return
      const formData = this.loginForm.value as LoginRequest
      formData["g-recaptcha-response"] = this.recaptchaVerified
      console.log(formData)
      this.service.login(formData).subscribe();
  }


}
