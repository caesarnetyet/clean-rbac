import {Routes} from "@angular/router";
import {adminGuard} from "../guards/admin.guard";
import {GuestComponent} from "../components/guest/guest.component";

export const dashboardRoutes: Routes = [
    {
        path: 'admin',
        loadComponent: () => import('./admin/admin.component').then(c => c.AdminComponent),
        canActivate: [adminGuard]
    },
    {
        path: 'coordinator',
        loadComponent: () => import('./coordinator/coordinator.component').then(c => c.CoordinatorComponent),
    },
    {
        path: 'guest',
        component: GuestComponent
    }
]