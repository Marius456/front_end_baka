import { ShowTrackingExercisesComponent } from './ShowTrackingExecises/ShowTrackingExercises.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DropzoneConfigInterface, DropzoneModule, DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { GlobalModule } from '../globalFrontendComponents/global.module';
import { AddExerciseComponent } from './AddExercise/AddExercise.component';
import { AddExerciseToPlanComponent } from './AddExerciseToPlan/AddExerciseToPlan.component';
import { AddPlanComponent } from './AddPlan/AddPlan.component';
import { AdminRoutes } from './admin.routing';
import { BookmarksComponent } from './Bookmarks/Bookmarks.component';
import { AdminDashboardlComponent } from './Dashboard/AdminDashboard.component';
import { MessagesComponent } from './Messages/Messages.component';
import { ProfileComponent } from './Profile/Profile.component';
import { ReviewsComponent } from './Reviews/Reviews.component';
import { ShowExercisesComponent } from './ShowExercises/ShowExercises.component';
import { ShowPlansComponent } from './ShowPlans/ShowPlans.component';
import { ShowUsersComponent } from './ShowUsers/ShowUsers.component';
import { UserProfileComponent } from './UserProfile/UserProfile.component';
import { UserProgressComponent } from './UserProgress/UserProgress.component';



FullCalendarModule.registerPlugins([ 
  dayGridPlugin,
  interactionPlugin,
  listPlugin
]);
const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
   // Change this to your upload POST address:
    url: 'https://httpbin.org/post',
    maxFilesize: 50,
    acceptedFiles: 'image/*'
  };


@NgModule({
  imports: [
    CommonModule,
    GlobalModule,
    DropzoneModule,
    RouterModule.forChild(AdminRoutes),
    FullCalendarModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ],
  declarations: [ 
    AdminDashboardlComponent,
    MessagesComponent,
    ReviewsComponent,
    BookmarksComponent,
    ShowPlansComponent,
    ShowExercisesComponent,
    AddPlanComponent,
    AddExerciseToPlanComponent,
    AddExerciseComponent,
    ShowUsersComponent,
    UserProfileComponent,
    UserProgressComponent,
    ShowTrackingExercisesComponent,
    ProfileComponent
  ],
  providers: [
   {
     provide: DROPZONE_CONFIG,
     useValue: DEFAULT_DROPZONE_CONFIG
   }
 ]
})

export class AdminModule {}
