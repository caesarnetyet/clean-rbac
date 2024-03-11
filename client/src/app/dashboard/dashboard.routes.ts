import {Routes} from "@angular/router";
import {adminGuard} from "../guards/admin.guard";

export const dashboardRoutes: Routes = [
    {
        path: 'admin',
        loadComponent: () => import('./admin/admin.component').then(c => c.AdminComponent),
        canActivate: [adminGuard]
    }
]