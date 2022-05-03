import { UserService } from './../../services/user.service';
import { PlanService } from './../../services/plan.service';
import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { EventInput, CalendarOptions } from '@fullcalendar/core';
import { Observable } from 'rxjs';
import { Exercise } from '../../entities/exercise';
import { AuthenticationService } from '../../services/authentication.service';
import { Plan } from '../../entities/plan';

@Component({
  selector: 'admin-dadhboard',
  templateUrl: './AdminDashboard.component.html',
  styleUrls: ['./AdminDashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminDashboardlComponent implements OnInit{  
  
  BookmarkedPlans :  Plan[];
  allExercises:Observable<Exercise[]>;  
  events: EventInput[] = [{}]; 
  calendarOptions: CalendarOptions = {
   initialView: 'dayGridMonth',
   headerToolbar: {
     left: 'prev,next today',
     center: 'title',
     right: 'dayGridMonth,listWeek'
   }, 
   dayMaxEvents: true // allow "more" link when too many events
 };
  color= '#';
  letters = '0123456789ABCDEF';

   constructor(
    private PlanService:PlanService,
    private authenticationService: AuthenticationService,
    private UserService:UserService
   ){}

   ngOnInit(){
    this.GetCalendarData();
   }


   GetCalendarData()    
   {      
     this.UserService.getUserBookmarkPlans(this.authenticationService.currentUserValue.id)
                           .subscribe(bookmarks => 
                            bookmarks.forEach(bookmarkedPlan => {
                              this.allExercises = this.PlanService.getTrackedPlanExercises(bookmarkedPlan.bookmarkId);    
                              if(this.allExercises != undefined){
                                this.allExercises.subscribe(exercises =>{
                                  exercises.forEach(exercise => {
                                    if(exercise.state == "Success")
                                      this.events.push({ title: exercise.text, date: exercise.time, allDay: true, color: 'green', url: '/admin/progress/' + bookmarkedPlan.bookmarkId})
                                    else if(exercise.state == "Failed")
                                      this.events.push({ title: exercise.text, date: exercise.time, allDay: true, color: 'red', url: '/admin/progress/' + bookmarkedPlan.bookmarkId})
                                    else if(exercise.state == "Incomplete")
                                      this.events.push({ title: exercise.text, date: exercise.time, allDay: true, color: 'blue', url: '/admin/progress/' + bookmarkedPlan.bookmarkId})
                                })});   
                              }  
                              this.calendarOptions.events = this.events;   
                            }));   
   } 
}
