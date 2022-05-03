import { Bookmark } from './../../entities/user';
import { AuthenticationService } from './../../services/authentication.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Plan } from '../../entities/plan';
type GUID = string & { isGuid: true};

@Component({
  selector: 'admin-bookmarks',
  templateUrl: './Bookmarks.component.html',
  styleUrls: ['./Bookmarks.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BookmarksComponent implements OnInit{

   Data :  Plan[];

   constructor(
      private authenticationService: AuthenticationService,
      private UserService:UserService
      ){}

   ngOnInit(){
      this.GetBookmarks();  
   }

   GetBookmarks()    
   {      
     this.UserService.getUserBookmarkPlans(this.authenticationService.currentUserValue.id)
                           .subscribe(bookmarks => this.Data = bookmarks);
   } 
   
   DeleteBookmark(bookmarkId: GUID) {  
      if (confirm("Are You Sure To Delete this Bookmark?")) {  
        this.UserService.deletePlanTracker(bookmarkId).subscribe(() => 
                        this.UserService.deleteBookmark(bookmarkId).subscribe(() => this.GetBookmarks()))
      }     
    }
}
