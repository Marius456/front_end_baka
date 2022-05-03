import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from './../../entities/user';
import { AuthenticationService } from './../../services/authentication.service';
import { UserService } from './../../services/user.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'admin-users',
  templateUrl: './ShowUsers.component.html',
  styleUrls: ['./ShowUsers.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShowUsersComponent implements OnInit{
   Data:User[];   
  showModal: boolean;
  FromUser: FormGroup;
  submitted = false;
   
   constructor(
    private formBuilder: FormBuilder,
    private UserService:UserService
   ) { 
   }    
   
   ngOnInit(): void {  
       this.GetUser();  
       
    this.FromUser = this.formBuilder.group({
      Text: ['']
  });
   }
 
   show()
   {
     this.showModal = true;
   }
   
   hide()
   {
     this.showModal = false;
   }

   get f() { return this.FromUser.controls; }

   GetUser()    
   {  
      this.UserService.getUsers().subscribe(users => this.Data = users);    
   } 

   ChangeUserRole(user: User) {
    this.submitted = true;

    this.UserService.updateUser(user.id, user).subscribe();

    if(this.submitted)
    {
      this.showModal = false;
    }
 }
 
   DeleteUser(UserId: string) {  
     if (confirm("Are you sure to delete this user?")) {  
         this.UserService.deleteUser(UserId).subscribe(  
             () => {  
                 this.GetUser();  
             });  
     }     
   }  
}
