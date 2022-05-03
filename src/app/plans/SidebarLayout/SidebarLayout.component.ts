import { ReviewService } from './../../services/review.service';
import { Review } from './../../entities/review';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User, Bookmark } from '../../entities/user';
import { AuthenticationService } from './../../services/authentication.service';
import { UserService } from './../../services/user.service';
type GUID = string & { isGuid: true};

@Component({
  selector: 'sidebar-layout',
  templateUrl: './SidebarLayout.component.html',
  styleUrls: ['./SidebarLayout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarLayoutComponent implements OnInit{
  user: User;
  gfg = 0;
  @Input() public userId: GUID;
  @Input() public planId: GUID;
  showModal: boolean;
  FromReview: FormGroup;
  submitted = false;
  booking: Bookmark;
  

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private UserService: UserService,
    private ReviewService: ReviewService
    ) {
        if (!this.authenticationService.currentUserValue) {
          this.router.navigate(['/session/login']);
        }
      }

  ngOnInit()
  {
    this.GetUser();

    this.FromReview = this.formBuilder.group({
        Rating: [null, [Validators.required]],
        Text: ['', [Validators.required]]
    });
  }

  show()
  {
    this.showModal = true; // Show-Hide Modal Check
    
  }
  
  hide()
  {
    this.showModal = false;
  }

  
  get f() { return this.FromReview.controls; }
  
  GetUser()    
  { 
    this.UserService.getUser(this.userId.toString())
                    .subscribe(user => this.user = user);  
  } 

  CreateReview(review: Review) {
    this.submitted = true;
    if (this.FromReview.invalid) {
       return;
    }
    review.userId = this.authenticationService.currentUserValue.id;
    review.planId = this.planId;
    
    this.ReviewService.addReview(review).subscribe();

    if(this.submitted)
    {
      this.showModal = false;
    }
 }

 bookPlan(){
    if (confirm("Are you sure to follow this plan?")) {   
      this.booking = { id: this.planId, userId : this.authenticationService.currentUserValue.id, planId : this.planId};
      this.UserService.addBookmark(this.booking).subscribe(bookmark=>
                  this.UserService.addPlanTracker(bookmark).subscribe()
                  )
    }
  }
}
