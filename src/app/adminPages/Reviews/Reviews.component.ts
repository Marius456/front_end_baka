import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Review } from './../../entities/review';
import { AuthenticationService } from './../../services/authentication.service';
import { ReviewService } from './../../services/review.service';
type GUID = string & { isGuid: true};

@Component({
  selector: 'admin-reviews',
  templateUrl: './Reviews.component.html',
  styleUrls: ['./Reviews.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReviewsComponent implements OnInit{
  reviews: Review[];   

  constructor(
    private authenticationService: AuthenticationService,
    private ReviewService: ReviewService,
    ){}

  ngOnInit()
  {
    this.GetReviews();
  }
  
  GetReviews()    
  {  
    this.ReviewService.getUserPlansReviews(this.authenticationService.currentUserValue.id).subscribe(reviews => this.reviews = reviews);  
  } 

  DeleteReview(ReviewId: GUID) {  
    if (confirm("Are You Sure To Delete this Informations")) {  
        this.ReviewService.deleteReview(ReviewId).subscribe(  
            () => {  
                this.GetReviews();  
            });  
    }     
  }  
}
