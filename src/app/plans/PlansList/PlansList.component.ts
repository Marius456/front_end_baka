import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Plan } from './../../entities/plan';
import { AuthenticationService } from './../../services/authentication.service';
import { PlanService } from './../../services/plan.service';

@Component({
  selector: 'list',
  templateUrl: './PlansList.component.html',
  styleUrls: ['./PlansList.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlansListComponent implements OnInit{
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
