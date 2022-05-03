import { AuthenticationService } from './../../services/authentication.service';
import { PlanService } from './../../services/plan.service';
import { Router } from '@angular/router';
import { Plan } from './../../entities/plan';
import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'admin-plans',
  templateUrl: './ShowPlans.component.html',
  styleUrls: ['./ShowPlans.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShowPlansComponent implements OnInit{
   Data:Plan[];   
   
   constructor(
      private authenticationService: AuthenticationService,
      private PlanService:PlanService
   ) { 
   }    
   
   ngOnInit(): void {  
       this.GetPlan();  
   }
 
   GetPlan()    
   {  
      this.PlanService.getUserPlans(this.authenticationService.currentUserValue.id)
                      .subscribe(plans => this.Data = plans);    
   } 

   DeletePlan(PlanId: string) {  
     if (confirm("Are You Sure To Delete this Informations")) {  
       this.PlanService.deletePlanExercises(PlanId)
                      .subscribe(() =>
                        this.PlanService.deletePlan(PlanId).subscribe(  
                            () => {  
                                this.GetPlan();  
                            }) );
     }     
   }  
}
