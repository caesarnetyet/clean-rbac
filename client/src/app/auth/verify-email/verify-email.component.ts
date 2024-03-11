import {HttpClient} from "@angular/common/http";
import { Component } from '@angular/core';
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {ToastService} from "../../common/services/toast/toast.service";

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [
    MatProgressSpinner
  ],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.css'
})
export class VerifyEmailComponent {

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private http: HttpClient,
      private toast: ToastService) {
  }

  ngOnInit(): void {
    const url = this.getUrlParam();

    this.verifyEmail(url);
  }

  getUrlParam() {
    const url  =this.route.snapshot.queryParamMap.get('url');
    if (url === null) {
      this.router.navigate(['auth/login']).then(
          () => this.toast.error("Por favor, inicie sesión y solicite un nuevo email de verificación")
      );
      return ""
    }

    return decodeURIComponent(url)

  }

  verifyEmail(url :string) {
    return this.http.patch(url, {}).subscribe({
      next: () => {
        this.router.navigate(['auth/login']).then(
            () => this.toast.success("Email verificado, por favor inicie sesión")
        );
      },
      error: () => {
        this.router.navigate(['auth/login']).then(
            () => this.toast.error("No se pudo verificar el email, por favor inicie sesión y solicite un nuevo email de verificación")
        );
      }
    })
  }


}
