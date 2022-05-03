import { Router } from '@angular/router';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
declare var $ : any;

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './AdminSidebar.component.html',
  styleUrls: ['./AdminSidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminSidebarComponent implements OnInit {
   user_role: any;

   // sidebarIn : boolean = false;
   constructor(
      private authenticationService: AuthenticationService,
      private router: Router
   ){}

   ngOnInit(){
      this.getUserValue();
   }


   toggleMenu()
   {
      if ( $('app-admin-panel').hasClass( "sidebar-in" ) ) {
         $('app-admin-panel').removeClass("sidebar-in");
      }
      else
      {
         $('app-admin-panel').addClass("sidebar-in");
      }
      // this.sidebarIn = !this.sidebarIn;
   }
   
   logout() 
   {
         this.authenticationService.logout();
         this.router.navigate(['/login']);
   }

   getUserValue()
   {
      this.user_role = this.authenticationService.getAccessToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
   }
}
