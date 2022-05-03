import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarOptions, EventInput } from '@fullcalendar/angular';
import { Observable } from 'rxjs';
import { Exercise } from './../../entities/exercise';
import { Plan } from './../../entities/plan';
import { Review, ReviewCount } from './../../entities/review';
import { AuthenticationService } from './../../services/authentication.service';
import { PlanService } from './../../services/plan.service';
import { ReviewService } from './../../services/review.service';

@Component({
  selector: 'plan-detail',
  templateUrl: './PlansDetail.component.html',
  styleUrls: ['./PlansDetail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlansDetailComponent implements OnInit{

   gfg = 5;
   foundPlan:Plan;
   planReviewsCount:ReviewCount;
   reviewSum: number;
   allExercises:Observable<Exercise[]>;    
   allReviews:Review[];  
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
  
   constructor(
     private ReviewService:ReviewService,
     private PlanService:PlanService,
     private router: Router,
     private route: ActivatedRoute,
     private authenticationService: AuthenticationService
     ) {
       if (!this.authenticationService.currentUserValue) {
         this.router.navigate(['/session/login']);
     }
      }   


   ngOnInit(): void {  
       this.GetData(); 
       this.GetCalendarData();
   }
 
   refreshCalendar() {
      window.dispatchEvent(new Event('resize'));
  }
   GetData()    
   {      
     this.allExercises = this.PlanService.getPlanExercises(this.route.snapshot.paramMap.get('id'));    
     this.ReviewService.getPlanReviews(this.route.snapshot.paramMap.get('id')).subscribe(reviews => this.allReviews = reviews);   
     this.PlanService.getPlan(this.route.snapshot.paramMap.get('id')).subscribe(plan => this.foundPlan = plan);
   } 

   GetCalendarData()    
  {       
    if(this.allExercises != undefined){
      this.allExercises.subscribe(ex =>
        ex.forEach(element => {
          this.events.push({ title: element.title, date: element.time, allDay: true})
      }));   
    }  
    this.calendarOptions.events = this.events;         
  } 
}
