import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './components/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommentsComponent } from './components/comments/comments.component';
import { UsersComponent } from './components/users/users.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FooterComponent } from './nav-menu/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PostComponent } from './components/post/post.component';
import { PlanComponent } from './components/plan/plan.component';
import { ExerciseComponent } from './components/exercise/exercise.component';
import { CalendarComponent } from './components/calendar/calendar.component';

import { FullCalendarModule } from '@fullcalendar/angular';
import { RecordComponent } from './components/record/record.component'; // for FullCalendar!  

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CommentsComponent,
    UsersComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    PostComponent,
    PlanComponent,
    ExerciseComponent,
    CalendarComponent,
    RecordComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    FullCalendarModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AngularSvgIconModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'comments', component: CommentsComponent },
      { path: 'users', component: UsersComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'posts', component: PostComponent },
      { path: 'plans', component: PlanComponent },
      { path: 'exercises', component: ExerciseComponent },
      { path: 'calendar', component: CalendarComponent },
      { path: 'record', component: RecordComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
