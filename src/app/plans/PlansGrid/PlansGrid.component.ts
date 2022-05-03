import { AuthenticationService } from './../../services/authentication.service';
import { Plan } from './../../entities/plan';
import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PlanService } from './../../services/plan.service';

@Component({
  selector: 'grid',
  templateUrl: './PlansGrid.component.html',
  styleUrls: ['./PlansGrid.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlansGridComponent implements OnInit{
  Data:Plan[];   
  selectedCategory = this.route.snapshot.paramMap.get('category') ;

  constructor(
     private router: Router,
     private route: ActivatedRoute,
     private authenticationService: AuthenticationService,
     private PlanService:PlanService
     ) { 
      if (!this.authenticationService.currentUserValue) {
        this.router.navigate(['/session/login']);
      }
     }    
   
   ngOnInit(): void {  
       this.GetPlan();  
   }
 
   GetPlan()    
   {  
      if(this.route.snapshot.paramMap.get('category') == null)
      {
        this.PlanService.getPublicPlans()
                      .subscribe(plans => this.Data = plans);   
      }
      else
      {
        this.PlanService.getPlansByCategory(this.route.snapshot.paramMap.get('category'))
                        .subscribe(plans => this.Data = plans); 
      }   
   } 
}
