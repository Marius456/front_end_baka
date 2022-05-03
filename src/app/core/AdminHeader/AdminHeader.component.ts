import { UserService } from './../../services/user.service';
import { AuthenticationService } from './../../services/authentication.service';
import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { AdminMenuItems } from './admin-menu-items';
import { User } from '../../entities/user';

@Component({
  selector: 'app-admin-header',
  templateUrl: './AdminHeader.component.html',
  styleUrls: ['./AdminHeader.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminHeaderComponent implements OnInit {
   currentUser: User;


   constructor(
     public adminMenuItems: AdminMenuItems,
     private router: Router,
     private authenticationService: AuthenticationService,
     private UserService: UserService
     ) {
       if (!this.authenticationService.currentUserValue) {
          this.router.navigate(['/session/login']);
        }
        this.currentUser = this.authenticationService.currentUserValue;       
      }

    ngOnInit() 
    {
      this.GetUser();
    }

    GetUser()    
    { 
        this.UserService.getUser(this.authenticationService.currentUserValue.id.toString())
                        .subscribe(user => this.currentUser = user);  
    } 

    
    logout() 
    {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
    }
}
