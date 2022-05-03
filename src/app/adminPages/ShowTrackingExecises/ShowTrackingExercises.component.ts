import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Exercise } from './../../entities/exercise';
import { State } from './../../entities/user';
import { PlanService } from './../../services/plan.service';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'admin-trackingexercises',
  templateUrl: './ShowTrackingExercises.component.html',
  styleUrls: ['./ShowTrackingExercises.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShowTrackingExercisesComponent implements OnInit{
   Data:Exercise[];   
   state: State;
   
   constructor(
    private formBuilder: FormBuilder,
    private UserService:UserService,
    private PlanService:PlanService,
    private route: ActivatedRoute
    ) { 
   }    
   
   ngOnInit(): void {  
       this.GetTrackedExercises();  
   }

   GetTrackedExercises()    
   {  
    this.PlanService.getTrackedPlanExercises(this.route.snapshot.paramMap.get('id')).subscribe(exercises => this.Data = exercises);    
   } 
 
   UpdateState(UserId: string) {  
    this.state = { stateName: "Success"};
    this.UserService.updatePlanTracker(UserId, this.state).subscribe(  
        () => {  
            this.GetTrackedExercises();  
        });  
   }  
}
