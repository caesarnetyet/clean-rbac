import { Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {AuthComponent} from "./auth/auth.component";

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    loadChildren: () => import('./auth/auth.routes').then(m => m.authRoutes)
  },
  {
    component: AppComponent,
    path: '',
  }

];
