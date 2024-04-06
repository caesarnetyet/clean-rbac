import {Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {GuestComponent} from "./components/guest/guest.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GuestComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Role Based Access Control';

  constructor() {}

}
