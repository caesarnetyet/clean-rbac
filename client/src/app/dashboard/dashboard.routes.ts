import {Routes} from "@angular/router";

export const dashboardRoutes: Routes = [
    {
        path: 'admin',
        loadComponent: () => import('./admin/admin.component').then(c => c.AdminComponent)
    }
]