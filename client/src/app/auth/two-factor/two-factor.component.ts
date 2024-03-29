import {HttpClient} from "@angular/common/http";
import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {ActivatedRoute, Router} from "@angular/router";
import {from} from "rxjs";
import {ToastService} from "../../common/services/toast/toast.service";
import {LoginResponse} from "../login/login.contracts";

@Component({
  selector: 'app-two-factor',
  standalone: true,
    imports: [
        FormsModule,
        MatFormField,
        MatInput,
        MatInputModule,
        MatButton
    ],
  templateUrl: './two-factor.component.html',
  styleUrl: './two-factor.component.css'
})
export class TwoFactorComponent {
  signedURL= decodeURIComponent(this.route.snapshot.queryParams['signature']);
  code = '';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private toast: ToastService,
              private http: HttpClient) {}

  handleSubmit() {
    if (!this.code) return
    this.http.patch<LoginResponse>(this.signedURL, { token: this.code }).subscribe({
        next: (response) => {
            localStorage.setItem('token', response.token)
            this.toast.success(response.message)
            from(this.router.navigate(['/dashboard']))
        },
        error: (error) => {
            this.toast.error(error.error.message)
        }
    })
  }

}
