import { AuthenticationComponent } from './authentication/authentication.component';
import { CompanyTableComponent } from './company/components/table/table.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  // { path: '',   redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: AuthenticationComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'company', component: CompanyTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
