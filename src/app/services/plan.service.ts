import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exercise } from '../entities/exercise';
import { NewPlan, Plan } from '../entities/plan';


type GUID = string & { isGuid: true};

@Injectable({
  providedIn: 'root'
})

export class PlanService {
  Url = 'https://localhost:5001/api/plans/';

  constructor(private http:HttpClient) { }  

  getPlans():Observable<Plan[]>    
  {    
    return this.http.get<Plan[]>(this.Url);    
  } 

  addPlan(Plan: NewPlan): Observable<Plan> {
    return this.http.post<Plan>(this.Url, Plan)
  }  

  copyPlan(Plan: NewPlan): Observable<Plan> {
    return this.http.post<Plan>(this.Url + "c/", Plan)
  }  

  updatePlan(PlanId: GUID, Plan: Plan): Observable<Plan> {
    return this.http.put<Plan>(this.Url + PlanId, Plan)
  }  

  linkItemToIcon(PlanId: GUID, formData: any) {
      return this.http.put(this.Url + "file-upload/" + PlanId, formData);
  }  

  deletePlan(PlanId: string):Observable<number>    
  {    
    return this.http.delete<number>(this.Url + PlanId);    
  }
  
  getPlan(PlanId: string): Observable<Plan> {    
    return this.http.get<Plan>(this.Url + PlanId);    
  }   

  
  getUserPlans(UserId: GUID): Observable<Plan[]> {    
    return this.http.get<Plan[]>(this.Url + "user/" + UserId);    
  }   

  getFilteredPlans(state: number, userId: string): Observable<Plan[]> {    
    return this.http.get<Plan[]>(this.Url + "f/" + state + "/" + userId);    
  }  
   
  getPlansByCategory(category: string): Observable<Plan[]> {    
    return this.http.get<Plan[]>(this.Url + "cat/" + category);    
  }   

  getPublicPlans(): Observable<Plan[]> {    
    return this.http.get<Plan[]>(this.Url + "public");    
  }   

  getPlanExercises(PlanId: string):Observable<Exercise[]>   
  {    
    return this.http.get<Exercise[]>(this.Url + "exercises/" + PlanId);    
  } 

  getTrackedPlanExercises(BookmarkId: string):Observable<Exercise[]>   
  {    
    return this.http.get<Exercise[]>(this.Url + "trackedexercises/" + BookmarkId);    
  } 
  
  addPlanExercises(PlanId: string, Exercises: any): Observable<Plan> {
    return this.http.put<Plan>(this.Url + "upload/" + PlanId, Exercises)
  }  

  deletePlanExercises(PlanId: string):Observable<number>    
  {    
    return this.http.delete<number>(this.Url + "deletePE/" + PlanId);    
  }
}
