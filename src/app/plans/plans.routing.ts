import { PlansDetailComponent } from './PlansDetail/PlansDetail.component';
import { PlansGridComponent } from './PlansGrid/PlansGrid.component';
import { Routes } from '@angular/router';
import { PlansListComponent } from './PlansList/PlansList.component';

export const PlansRoutes: Routes = [
  {
    path: '',
    component: PlansListComponent
  },
  {
    path: 'list',
    component: PlansListComponent
  },
  {
    path: 'list/:category',
    component: PlansListComponent
  },
  {
    path: 'grid',
    component: PlansGridComponent
  },
  {
    path: 'grid/:category',
    component: PlansGridComponent
  },
  {
    path: 'detail/:id',
    component: PlansDetailComponent
  }];
