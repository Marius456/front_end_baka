import { Routes } from '@angular/router';
import { AdminPanelLayoutComponent } from './layouts/adminPanel/AdminPanelLayout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { FrontendPanelLayoutComponent } from './layouts/frontendPanel/FrontendPanel.component';


export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  }, 
  {
    path: '',
    component: FrontendPanelLayoutComponent,
    children: [{
      path: 'home',
      loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'plans',
    loadChildren: () => import('./plans/plans.module').then(m => m.PlansModule)
  }]
}, 
{
  path: 'admin',
  component: AdminPanelLayoutComponent,
  children: [{
    path: '',
    loadChildren: () => import('./adminPages/admin.module').then(m => m.AdminModule)
  }]
},
{
  path: 'session',
  component: AuthLayoutComponent,
  children: [{
    path: '',
    loadChildren: () => import('./session/session.module').then(m => m.SessionModule)
  }]
}
];
