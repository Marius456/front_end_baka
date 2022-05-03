import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GlobalModule } from '../globalFrontendComponents/global.module';
import { PlansRoutes } from './plans.routing';
import { PlansDetailComponent } from './PlansDetail/PlansDetail.component';
import { PlansGridComponent } from './PlansGrid/PlansGrid.component';
import { PlansListComponent } from './PlansList/PlansList.component';
import { SidebarLayoutComponent } from './SidebarLayout/SidebarLayout.component';

FullCalendarModule.registerPlugins([ 
  dayGridPlugin,
  interactionPlugin,
  listPlugin
]);

@NgModule({
  imports: [
    CommonModule,
    GlobalModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyBtdO5k6CRntAMJCF-H5uZjTCoSGX95cdk'}),
    RouterModule.forChild(PlansRoutes),
    FullCalendarModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [ 
    PlansDetailComponent,
    PlansListComponent,
    PlansGridComponent,
    SidebarLayoutComponent
   ]
})

export class PlansModule {}
