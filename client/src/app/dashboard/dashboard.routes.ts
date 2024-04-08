import {Routes} from "@angular/router";
import {adminGuard} from "../guards/admin.guard";
import {GuestComponent} from "../components/guest/guest.component";
import { coordinatorGuard } from "../guards/coordinator.guard";
import { CoordinatorComponent } from "./coordinator/coordinator.component";
import { UserComponent } from "./user/user.component";

export const dashboardRoutes: Routes = [
    {
        path: 'admin',
        loadComponent: () => import('./admin/admin.component').then(c => c.AdminComponent),
        canActivate: [adminGuard]
    },
    {
        path: 'coordinator',
        component: CoordinatorComponent,
        //loadComponent: () => import('./coordinator/coordinator.component').then(c => c.CoordinatorComponent),
        loadChildren: () => import('./coordinator/coordinator.routes').then(m => m.coordinatorRoutes),
        canActivate: [coordinatorGuard],
        // children: [
        //     {
        //         path: 'mostrar-tarea',
        //         component: MostrarTareaComponent,
        //     }
        // ] 
    },
    {
        path: 'guest',
        component: UserComponent
    }
]