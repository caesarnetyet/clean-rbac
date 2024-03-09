import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import { LoginService } from "./login.service";
import { LoginRequest } from "./login.contracts";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
  export class LoginComponent {
    loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  constructor(private service: LoginService) {}

  handleSubmit() {
   if (!this.loginForm.valid) return
      const formData = this.loginForm.value as LoginRequest
      this.service.login(formData).subscribe();
  }
}
