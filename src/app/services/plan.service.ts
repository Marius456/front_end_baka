import { Injectable } from '@angular/core';     
import { Observable } from 'rxjs';    

import {HttpClient} from '@angular/common/http';    
import {HttpHeaders} from '@angular/common/http'; 
import { Plan, NewPlan } from '../entities/plan';

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

  updatePlan(PlanId: number, Plan: Plan): Observable<Plan> {
    return this.http.put<Plan>(this.Url + PlanId, Plan)
  }  

  deletePlan(PlanId:string):Observable<number>    
  {    
    return this.http.delete<number>(this.Url+ PlanId);    
  }
  
  getPlan(PlanId: string): Observable<Plan> {    
    return this.http.get<Plan>(this.Url + PlanId);    
  }   

  getFilteredPlans(state: number, userId: number): Observable<Plan[]> {    
    return this.http.get<Plan[]>(this.Url+ "f/" + state +"/"+ userId);    
  }   
}
