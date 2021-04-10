import { CompanyAddComponent } from './components/add/add.component';
import { Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { CompanyTableComponent } from './components/table/table.component';
import { CompanyComplianceComponent } from './components/compliance/compliance.component';
import { ComplianceGuard } from './guard/compliance.guard';

export const companyRoutes: Routes = [{
    path: 'company',
    component: CompanyTableComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Consultoria e Assessorias',
      breadcrumb: [
        {
          label: 'Dashboard',
          url: '/dashboard'
        },
        {
          label: 'Consultoria e Assessorias',
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
      title: 'Consultoria e Assessorias',
      breadcrumb: [
        {
          label: 'Dashboard',
          url: '/dashboard'
        },
        {
          label: 'Consultoria e Assessorias',
          url: '/company'
        },
        {
            label: 'Cadastrar',
            url: ''
        },
      ]
    },
  },
  {
    path: 'company/:id/compliance',
    component: CompanyComplianceComponent,
    canActivate: [ComplianceGuard]
  }
];
