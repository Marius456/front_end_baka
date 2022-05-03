import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { loginUser } from './../../entities/user';
import { AuthenticationService } from './../../services/authentication.service';
import { UserService } from './../../services/user.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";


@Component({
  selector: 'login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit{

    dataSaved = false;    
    loading = false;
    message:string;    
    FromUser: FormGroup;    
    returnUrl: string;
    submitted = false;
  
    constructor(
      private formbuilder: FormBuilder,
      private UserService:UserService,
      private router: Router,
      private authenticationService: AuthenticationService
      ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
       } 
  
    ngOnInit() {
      this.FromUser = this.formbuilder.group({  
        Email: ['', [Validators.required]],  
        Password: ['', [Validators.required]],  
      });  
    }
  
    get f() { return this.FromUser.controls; }
  
    Login(User: loginUser) {
      this.submitted = true;
      if (this.FromUser.invalid) {
          return;
      }
          this.authenticationService.login(User)
              .pipe(first())
              .subscribe(
                  data => {
                      this.UserService.getUserBookmarkPlans(data.id)
                                            .subscribe(bookmarks =>  {
                                              bookmarks.forEach(bookmarkedPlan => {
                                                this.UserService.checkPlanTracker(bookmarkedPlan.bookmarkId).subscribe();   
                                               });
                                               window.location.reload();
                                               this.router.navigate([this.returnUrl]);
                                            });   
                  },
                  error => {
                      this.loading = false;
                  });
          this.router.navigate(['/']);
      }
}
