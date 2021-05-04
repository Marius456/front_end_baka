import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from "../../services/user.service";
import { loginUser } from '../../entities/user';  
import { User } from '../../entities/user';  
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { AlertService } from '../../services/alert.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  dataSaved = false;    
  loading = false;
  message:string;    
  FromUser: any;    
  returnUrl: string;

  constructor(
    private formbuilder: FormBuilder,
    private UserService:UserService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
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

  Login(User: loginUser) {
        this.authenticationService.login(User)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
        this.router.navigate(['/']);
    }

}
