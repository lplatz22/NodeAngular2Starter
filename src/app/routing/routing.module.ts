import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../unprotected/home.component';
import { ProtectedComponent } from '../protected/protected.component';
import { LoginComponent } from '../user/login.component';
import { RegisterComponent } from '../user/register.component';
import { AdminComponent } from '../protected/admin/admin.component';
import { RoutingGuard, AdminRoutingGuard } from './router.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'protected', component: ProtectedComponent, canActivate: [RoutingGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AdminRoutingGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  providers: [RoutingGuard, AdminRoutingGuard],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
