import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { loginUser, newPassword, NewUser, User } from '../entities/user';
import { Plan } from './../entities/plan';
import { Bookmark, Tracker, State } from './../entities/user';


type GUID = string & { isGuid: true};

@Injectable({
  providedIn: 'root'
})

export class UserService {
  Url = 'https://localhost:5001/api/users/';

  constructor(private http:HttpClient) { }  

  getUsers():Observable<User[]>    
  {    
    return this.http.get<User[]>(this.Url);    
  } 

  addUser(User: NewUser): Observable<User> {
    return this.http.post<User>(this.Url, User)
  }  

  updateUser(UserId: GUID, User: User): Observable<User> {
    return this.http.put<User>(this.Url + UserId, User)
  } 

  updatePassword(UserId: GUID, pass: newPassword): Observable<User> {
    return this.http.put<User>(this.Url + "p/" + UserId, pass)
  } 

  getUserBookmarkPlans(UserId: string):Observable<Plan[]>   
  {    
    return this.http.get<Plan[]>(this.Url + "plans/" + UserId);    
  } 

  addBookmark(userPlan: Bookmark): Observable<Plan> {
    return this.http.put<Plan>(this.Url + "addUP/", userPlan)
  } 

  addPlanTracker(userPlan: Plan): Observable<User> {
    return this.http.put<User>(this.Url + "addtracker/", userPlan)
  } 

  updatePlanTracker(TrackerId: string, state: State): Observable<User> {
    return this.http.put<User>(this.Url + "updatetracker/" + TrackerId, state)
  } 

  checkPlanTracker(BookmarkId: string): Observable<User> {
    return this.http.post<User>(this.Url + "checktracker/" + BookmarkId, null)
  } 

  deletePlanTracker(bookmarkId: string):Observable<number>    
  {    
    return this.http.delete<number>(this.Url + "deletetracker/" + bookmarkId);    
  }
  
  linkItemToIcon(UserId: GUID, formData: any) {
      return this.http.put(this.Url + "file-upload/" + UserId, formData);
  }  

  deleteUser(UserId:string):Observable<number>    
  {    
    return this.http.delete<number>(this.Url+ UserId);    
  }

  deleteBookmark(bookmarkId: string):Observable<number>    
  {    
    return this.http.delete<number>(this.Url + "deleteUP/" + bookmarkId);    
  }
  
  getUser(UserId: string): Observable<User> {    
    return this.http.get<User>(this.Url + UserId);    
  }   

  loginUser(User: loginUser): Observable<User> {
    return this.http.post<User>(this.Url+'login', User)
  }  
}
