import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../../entities/user';
import { UserService } from '../../services/user.service';
import { Plan } from '../../entities/plan';  
import { PlanService } from '../../services/plan.service'; 
import { Router } from '@angular/router';  
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  currentUser: User;
  currentUserName: string;
  allPlans:Observable<Plan[]>;   
  filteredPlans:Plan[];   
  users = [];

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService,
      private PlanService:PlanService,
      private userService: UserService
  ) {
      this.currentUser = this.authenticationService.currentUserValue;
      this.authenticationService.currentUserValue
      sessionStorage.setItem("user", this.authenticationService.currentUserValue.id.toString());
      this.GetPlans();
  }

  ngOnInit() {
      this.loadAllUsers();
  }

  private loadAllUsers() {
      this.userService.getUsers()
          .pipe(first())
          .subscribe(users => this.users = users);
  }

  GetPlans()    
  {       
    // this.allPlans=this.PlanService.getFilteredPlans(false);    
    this.PlanService.getFilteredPlans(1, parseInt(sessionStorage.getItem("user"), 10))
                    .pipe(first())
                    .subscribe(filteredPlans => this.filteredPlans = filteredPlans);  
  } 
  
  ShowExercises(Plan: Plan){
    sessionStorage.setItem("plan", Plan.id.toString());
    sessionStorage.setItem("planUserId", Plan.userId.toString());
    this.router.navigate(['/exercises']);
  }

  IsUserPlan(Plan: Plan){
    return Plan.userId.toString()===sessionStorage.getItem("user");
  }
}
