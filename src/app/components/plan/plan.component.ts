import { Component, OnInit } from '@angular/core';
import { Plan } from '../../entities/plan';  
import { PlanService } from '../../services/plan.service';   
import { ExerciseService } from '../../services/exercise.service';   
import { Router } from '@angular/router';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-services',
  templateUrl: './plan.component.html'
})
export class PlanComponent implements OnInit {

  dataSaved = false;    
  message:string;    
  FromPlan: any;    
  Id:number=0;    
  allPlans:Observable<Plan[]>;   
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private formbuilder: FormBuilder,
    private PlanService:PlanService,
    private ExerciseService:ExerciseService
    ) { 
      if (!this.authenticationService.currentUserValue) {
        this.router.navigate(['/login']);
      }
    }    
  
  ngOnInit(): void {  
    this.FromPlan = this.formbuilder.group({  
      Id: [0, [Validators.required]],  
      Name: ['', [Validators.required]],  
      Description: ['', [Validators.required]],  
    });  
      this.GetPlan();  
  }

  UpdateId() : void{
    this.FromPlan.patchValue({
      Id: this.Id,
    })
  }

  Reset()    
  {    
    
    this.Id = 0;  
    this.FromPlan.controls['Name'].setValue('');  
    this.FromPlan.controls['Description'].setValue('');  
   // this.FromPlan.reset();  
  }

  GetPlan()    
  {      
    // this.allPlans=this.PlanService.getPlans();    
    this.allPlans=this.PlanService.getFilteredPlans(0, 0);    
  } 

  CreatePlan(Plan: Plan) {
    Plan.userId = parseInt(sessionStorage.getItem("user"), 10);
    Plan.state = 0;
    if(this.Id != 0){
      this.UpdatePlan(this.Id, Plan);
    }
    this.PlanService.addPlan(Plan)
    .subscribe(() => {  
            this.dataSaved = true;  
            this.message = 'Record saved Successfully';  
            this.Id = 0;
            this.Reset();  
            this.GetPlan();  
        });  
  }

  EditPlan(PlanId: string) {  
    this.PlanService.getPlan(PlanId).subscribe(Response => {  
        this.message = null;  
        this.dataSaved = false; 
        this.Id = Response.id;  
        this.FromPlan.controls['Name'].setValue(Response.name);  
        this.FromPlan.controls['Description'].setValue(Response.description);  
    });  
  } 

  UpdatePlan(PlanId: number, Plan: Plan) {
    this.PlanService.updatePlan(PlanId, Plan)
    .subscribe(() => {  
            this.dataSaved = true;  
            this.message = 'Record saved Successfully';  
            this.Id = 0;
            this.Reset();  
            this.GetPlan();  
        });  
  }

  DeletePlan(PlanId: string) {  
    if (confirm("Are You Sure To Delete this Informations")) {  
        this.PlanService.deletePlan(PlanId).subscribe(  
            () => {  
                this.dataSaved = true;  
                this.message = "Deleted Successfully";  
                this.GetPlan();  
            });  
    }     
  }   

  IsUserPlan(Plan: Plan){
    return Plan.userId.toString()===sessionStorage.getItem("user");
  }

  ShowExercises(Plan: Plan){
    sessionStorage.setItem("plan", Plan.id.toString());
    sessionStorage.setItem("planUserId", Plan.userId.toString());
    this.router.navigate(['/exercises']);
  }

  CopyPlan(Plan: Plan){
    if (confirm("Are You Sure To Copy this Plan")) {  
      Plan.userId = parseInt(sessionStorage.getItem("user"), 10);
      Plan.state = 1;
    this.PlanService.copyPlan(Plan)
    .subscribe(() => {  
            this.dataSaved = true;  
            this.message = 'Record saved Successfully';  
            this.Id = 0;
            this.Reset();  
            this.GetPlan();  
        });        
  }     
  }
  
}
