import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from "../../services/user.service";
import { User } from '../../entities/user';  
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  dataSaved = false;    
  message:string;    
  FromUser: any;    
  Id:number=0;    
  allUsers:Observable<User[]>;    
  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private UserService:UserService) {

     }    
  
  ngOnInit(): void {  
    this.FromUser = this.formbuilder.group({  
      Id: [0, [Validators.required]],  
      Name: ['', [Validators.required]],  
      Email: ['', [Validators.required]],  
      Password: ['', [Validators.required]],  
    });  
  }

  CreateUser(User: User) {
    this.UserService.addUser(User)
    .subscribe(() => {  
            this.dataSaved = true;  
            this.message = 'Record saved Successfully';  
            this.Id = 0; 
        });  
    this.router.navigate(['/login']);
  }
}
