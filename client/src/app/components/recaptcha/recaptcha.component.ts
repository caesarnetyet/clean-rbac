import {Component, EventEmitter, Output} from '@angular/core';
import {MatProgressBar} from "@angular/material/progress-bar";
import {RecaptchaModule} from "ng-recaptcha";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-recaptcha',
  standalone: true,
  imports: [
    MatProgressBar,
      RecaptchaModule
  ],
  templateUrl: './recaptcha.component.html',
  styleUrl: './recaptcha.component.css'
})
export class RecaptchaComponent {
  siteKey = environment.siteKey
  @Output() resolved = new EventEmitter<boolean>

    handleResolved() {
        this.resolved.emit(true)
    }
}
