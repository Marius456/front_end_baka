import { Routes } from '@angular/router';

import { DashboardOneComponent } from './DashboardOne/DashboardOne.component';

export const DashboardRoutes: Routes = [
{
  path: '',
  component: DashboardOneComponent
},
{
  path: 'home',
  component: DashboardOneComponent
}];
