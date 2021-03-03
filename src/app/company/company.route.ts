import { CompanyAddComponent } from './components/add/add.component';
import { Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { CompanyTableComponent } from './components/table/table.component';

export const companyRoutes: Routes = [{
    path: 'company',
    component: CompanyTableComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Consultoria e Acessorias',
      breadcrumb: [
        {
          label: 'Dashboard',
          url: '/dashboard'
        },
        {
          label: 'Consultoria e Acessorias',
          url: ''
        }
      ]
    }
  },
  {
    path: 'company/add',
    component: CompanyAddComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Consultoria e Acessorias',
      breadcrumb: [
        {
          label: 'Dashboard',
          url: '/dashboard'
        },
        {
          label: 'Consultoria e Acessorias',
          url: '/company'
        },
        {
            label: 'Cadastrar',
            url: ''
        },
      ]
    }
  }];
