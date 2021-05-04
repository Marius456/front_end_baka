import { Injectable } from '@angular/core';     
import { Observable } from 'rxjs';    

import {HttpClient} from '@angular/common/http';    
import {HttpHeaders} from '@angular/common/http'; 
import { Exercise, NewExercise } from '../entities/exercise';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  Url = 'https://localhost:5001/api/exercises/';

  constructor(private http:HttpClient) { }  

  getExercises():Observable<Exercise[]>    
  {    
    return this.http.get<Exercise[]>(this.Url);    
  } 

  getPlanExercises(PlanId: string):Observable<Exercise[]>    
  {    
    return this.http.get<Exercise[]>(this.Url+"plans/"+PlanId);    
  } 

  addExercise(exercise: NewExercise): Observable<Exercise> {
    return this.http.post<Exercise>(this.Url, exercise)
  }  

  updateExercise(ExerciseId: number, exercise: Exercise): Observable<Exercise> {
    return this.http.put<Exercise>(this.Url + ExerciseId, exercise)
  }  

  deleteExercise(ExerciseId:string):Observable<number>    
  {    
    return this.http.delete<number>(this.Url+ ExerciseId);    
  }
  
  getExercise(ExerciseId: string): Observable<Exercise> {    
    return this.http.get<Exercise>(this.Url + ExerciseId);    
  }   
}
