import { Review } from './../../entities/review';
import { ReviewService } from './../../services/review.service';
import { UserService } from './../../services/user.service';
import { PlanService } from './../../services/plan.service';
import { AuthenticationService } from './../../services/authentication.service';
import { Plan } from './../../entities/plan';
import { User } from './../../entities/user';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
type GUID = string & { isGuid: true};

@Component({
  selector: 'user-profile',
  templateUrl: './UserProfile.component.html',
  styleUrls: ['./UserProfile.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class UserProfileComponent implements OnInit{
   currentUser: User;
   userId: string;
   plans: Plan[];   
   reviews: Review[];   
 
   constructor(
       private router: Router,
       private route: ActivatedRoute,
       private authenticationService: AuthenticationService,
       private PlanService: PlanService,
       private UserService: UserService,
       private ReviewService: ReviewService
   ) {
   if (!this.authenticationService.currentUserValue) {
      this.router.navigate(['/session/login']);
   }

   if(this.route.snapshot.paramMap.get('id'))
      this.userId = this.route.snapshot.paramMap.get('id');
   else
      this.userId = this.authenticationService.currentUserValue.id;
   }
 
   ngOnInit() 
   {
      this.GetUser();
      this.GetPlans();
      this.GetReviews();
   }
 
   GetUser()    
   { 
      this.UserService.getUser(this.userId)
                      .subscribe(user => this.currentUser = user);  
      
   } 
   
   GetPlans()    
   {  
     this.PlanService.getFilteredPlans(0, this.userId)
                    .pipe(first())
                    .subscribe(filteredPlans => this.plans = filteredPlans);  
   } 

   GetReviews()    
   {  
     this.ReviewService.getUserReviews(this.userId).subscribe(reviews => this.reviews = reviews);  
   } 
}
