import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewReview, Review, ReviewCount } from '../entities/review';

type GUID = string & { isGuid: true};

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  Url = 'https://localhost:5001/api/reviews/';

  findReviews: Review[];

  constructor(private http:HttpClient) { }  

  getReviews():Observable<Review[]>    
  {    
    return this.http.get<Review[]>(this.Url);    
  } 

  getPlanReviews(PlanId: string):Observable<Review[]>   
  {    
    return this.http.get<Review[]>(this.Url+"plans/"+PlanId);    
  } 

  getUserReviews(UserId: string):Observable<Review[]>   
  {    
    return this.http.get<Review[]>(this.Url+"users/"+UserId);    
  } 

  getUserPlansReviews(UserId: GUID):Observable<Review[]>   
  {    
    return this.http.get<Review[]>(this.Url+"allreviews/"+UserId);    
  } 

  addReview(exercise: NewReview): Observable<Review> {
    return this.http.post<Review>(this.Url, exercise)
  }  

  updateReview(ReviewId: GUID, exercise: Review): Observable<Review> {
    return this.http.put<Review>(this.Url + ReviewId, exercise)
  }  

  deleteReview(ReviewId: GUID):Observable<number>    
  {    
    return this.http.delete<number>(this.Url+ ReviewId);    
  }
  
  getReview(ReviewId: GUID): Observable<Review> {    
    return this.http.get<Review>(this.Url + ReviewId);    
  }   
}
