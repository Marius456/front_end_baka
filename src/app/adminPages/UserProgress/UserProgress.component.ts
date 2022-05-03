import { PlanService } from './../../services/plan.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Plan } from './../../entities/plan';
import { AuthenticationService } from './../../services/authentication.service';
import { UserService } from './../../services/user.service';
type GUID = string & { isGuid: true};

@Component({
  selector: 'admin-progress',
  templateUrl: './UserProgress.component.html',
  styleUrls: ['./UserProgress.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserProgressComponent implements OnInit{
   Data:Plan[];   
   
   constructor(
      private authenticationService: AuthenticationService,
      private UserService:UserService
   ) { 
   }    
   
   ngOnInit(): void {  
       this.GetPlan();  
   }
 
   GetPlan()    
   {  
      this.UserService.getUserBookmarkPlans(this.authenticationService.currentUserValue.id)
                            .subscribe(bookmarks => this.Data = bookmarks);  
   } 
}
