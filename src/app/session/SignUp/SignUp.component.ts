import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../entities/user';

@Component({
  selector: 'signup',
  templateUrl: './SignUp.component.html',
  styleUrls: ['./SignUp.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SignUpComponent implements OnInit{

  dataSaved = false;    
  message:string;    
  FromUser: FormGroup;    
  allUsers:Observable<User[]>;    
  submitted = false;
  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private UserService: UserService
    ) {

     }    

   ngOnInit(){
    this.FromUser = this.formbuilder.group({  
      Name: ['', [Validators.required, Validators.minLength(3)]],  
      Email: ['', [Validators.required, Validators.email]],  
      Password: ['', [Validators.required, Validators.minLength(5)]],  
    });  }

   ngAfterViewInit()
   {
      
   }
   get f() { return this.FromUser.controls; }

  CreateUser(User: User) {
    this.submitted = true;
    if (this.FromUser.invalid) {
        return;
    }
    this.UserService.addUser(User)
                    .subscribe(() => {  
                            this.dataSaved = true;  
                        });  
    this.router.navigate(['/session/login']);
  }
}
