import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/entities/user';
import { Plan } from 'src/app/entities/plan';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Exercise } from '../../entities/exercise';
import { AuthenticationService } from '../../services/authentication.service';
import { ExerciseService } from '../../services/exercise.service';
import { PlanService } from '../../services/plan.service';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html'
})
export class ExerciseComponent implements OnInit {

  allUsers:Observable<User[]>; 
  foundUser:Observable<User>;
  foundPlan:Observable<Plan>;
  plan:Plan;
  dataSaved = false;    
  message:string;    
  FromExercise: any;    
  Id:number=0;    
  allExercises:Observable<Exercise[]>;    
  fromDate: Date;
  constructor(
    private formbuilder: FormBuilder,
    private ExerciseService:ExerciseService,
    private PlanService:PlanService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private UserService:UserService) {
      if (!this.authenticationService.currentUserValue) {
        this.router.navigate(['/login']);
    }
     }    
  
  ngOnInit(): void {  
    this.FromExercise = this.formbuilder.group({  
      Id: [0, [Validators.required]],  
      Time: [null, [Validators.required]],  
      Text: ['', [Validators.required]],  
    });  
      this.GetExercise();  
  }

  UpdateId() : void{
    this.FromExercise.patchValue({
      Id: this.Id,
    })
  }

  Reset()    
  {    
    this.Id = 0;  
    this.FromExercise.controls['Text'].setValue('');  
   // this.FromExercise.reset();  
  }

  GetExercise()    
  {      
    this.allExercises=this.ExerciseService.getPlanExercises(sessionStorage.getItem("plan"));    
    this.allUsers= this.UserService.getUsers(); 
    this.foundPlan= this.PlanService.getPlan(sessionStorage.getItem("plan"));
  } 
  
  GetUser(id : string)    
  {         
    this.foundUser = this.UserService.getUser(id); 
  } 

  CreateExercise(Exercise: Exercise) {
    Exercise.userId = parseInt(sessionStorage.getItem("user"), 10);
    Exercise.planId = parseInt(sessionStorage.getItem("plan"), 10);
    if(this.Id != 0){
      this.UpdateExercise(this.Id, Exercise);
    }
    this.ExerciseService.addExercise(Exercise)
    .subscribe(() => {  
            this.dataSaved = true;  
            this.message = 'Record saved Successfully';  
            this.Id = 0;
            this.Reset();  
            this.GetExercise();  
        });  
  }

  EditExercise(ExerciseId: string) {  
    this.ExerciseService.getExercise(ExerciseId).subscribe(Response => {  
        this.message = null;  
        this.dataSaved = false; 
        this.Id = Response.id;  
        this.FromExercise.controls['Text'].setValue(Response.text);  
    });  
  } 

  UpdateExercise(ExerciseId: number, Exercise: Exercise) {
    this.ExerciseService.updateExercise(ExerciseId, Exercise)
    .subscribe(() => {  
            this.dataSaved = true;  
            this.message = 'Record saved Successfully';  
            this.Id = 0;
            this.Reset();  
            this.GetExercise();  
        });  
  }

  DeleteExercise(ExerciseId: string) {  
    if (confirm("Are You Sure To Delete this Informations")) {  
        this.ExerciseService.deleteExercise(ExerciseId).subscribe(  
            () => {  
                this.dataSaved = true;  
                this.message = "Deleted Successfully";  
                this.GetExercise();  
            });  
    }     
  }  

  IsUserExercise(){
    if(sessionStorage.getItem("user")===null){
      return false;
    }

    return sessionStorage.getItem("planUserId")===sessionStorage.getItem("user");
  }

}
