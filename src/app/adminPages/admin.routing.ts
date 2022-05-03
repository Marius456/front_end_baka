import { ShowTrackingExercisesComponent } from './ShowTrackingExecises/ShowTrackingExercises.component';
import { Routes } from '@angular/router';
import { AddExerciseComponent } from './AddExercise/AddExercise.component';
import { AddExerciseToPlanComponent } from './AddExerciseToPlan/AddExerciseToPlan.component';
import { AddPlanComponent } from './AddPlan/AddPlan.component';
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


export const AdminRoutes: Routes = [{
  path: 'dashboard',
  component: AdminDashboardlComponent
},
{
  path: 'messages',
  component: MessagesComponent
},
{
  path: 'reviews',
  component: ReviewsComponent
},
{
  path: 'bookmarks',
  component: BookmarksComponent
},
{
  path: 'plans',
  component: ShowPlansComponent
},
{
  path: 'add-plan',
  component: AddPlanComponent
},
{
  path: 'add-plan/:id',
  component: AddPlanComponent
},
{
  path: 'plan/:id/exercises',
  component: AddExerciseToPlanComponent
},
{
  path: 'exercises',
  component: ShowExercisesComponent
},
{
  path: 'add-exercise',
  component: AddExerciseComponent
},
{
  path: 'add-exercise/:id',
  component: AddExerciseComponent
},
{
  path: 'users',
  component: ShowUsersComponent
},
{
  path: 'profile',
  component: UserProfileComponent
},
{
  path: 'progress',
  component: UserProgressComponent
},
{
  path: 'progress/:id',
  component: ShowTrackingExercisesComponent
},
{
  path: 'profile/:id',
  component: UserProfileComponent
},
{
  path: 'settings',
  component: ProfileComponent
}];
