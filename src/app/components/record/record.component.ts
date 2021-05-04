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
  selector: 'app-record',
  templateUrl: './record.component.html',
  styles: []
})
export class RecordComponent implements OnInit {
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
  }

  ngOnInit() {
      this.loadAllUsers();
  }

  private loadAllUsers() {
      this.userService.getUsers()
          .pipe(first())
          .subscribe(users => this.users = users);
  }
}
