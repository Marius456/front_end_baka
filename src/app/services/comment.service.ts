import { Injectable } from '@angular/core';     
import { Observable, throwError } from 'rxjs';    

import {HttpClient, HttpErrorResponse} from '@angular/common/http';    
import {HttpHeaders} from '@angular/common/http'; 
import { Comment, NewComment } from '../entities/comment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CommentService {
  Url = 'https://localhost:5001/api/comments/';

  constructor(private http:HttpClient) { }  

  getComments():Observable<Comment[]>    
  {    
    return this.http.get<Comment[]>(this.Url);   
  } 

  getComment(CommentId: string): Observable<Comment> {    
    return this.http.get<Comment>(this.Url + CommentId).pipe(catchError(this.handleError)); 
  }   

  getPostComments(PostId: string):Observable<Comment[]>    
  {    
    return this.http.get<Comment[]>(this.Url+"posts/"+PostId);
  } 

  addComment(comment: NewComment): Observable<Comment> {
    return this.http.post<Comment>(this.Url, comment).pipe(catchError(this.handleError));
  }  

  updateComment(CommentId: number, comment: Comment): Observable<Comment> {
    return this.http.put<Comment>(this.Url + CommentId, comment).pipe(catchError(this.handleError));
  }  

  deleteComment(CommentId: string):Observable<number>    
  {    
    return this.http.delete<number>(this.Url+ CommentId).pipe(catchError(this.handleError));  
  }
  
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
    } else {
        // The backend returned an unsuccessful response code.
        console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);

        if (error.status == 403) {
            throw new Error("You are not permitted to make changes on this account");
        }

        throw new Error("Unexpected error - please try again later");
    }

    // return an observable with a user-facing error message
    return throwError("Unexpected error - please try again later");
};
}
