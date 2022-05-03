import { formatDate } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Exercise } from '../../entities/exercise';
import { AuthenticationService } from './../../services/authentication.service';
import { ExerciseService } from './../../services/exercise.service';
import { PlanService } from './../../services/plan.service';
declare var $ : any;

@Component({  
  selector: 'admin-add-list',
  templateUrl: './AddExerciseToPlan.component.html',
  styleUrls: ['./AddExerciseToPlan.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddExerciseToPlanComponent implements OnInit{
   dynamicForm: FormGroup;
   submitted = false;
   exercisesNumber = 0;
   Data:Exercise[];   
   PlanExercises:Exercise[];   

   constructor(
      private authenticationService: AuthenticationService,
      private formBuilder: FormBuilder,
      private PlanService: PlanService,
      private ExerciseService: ExerciseService,
      private route: ActivatedRoute
      ) 
   {  }    

   ngOnInit() {
    this.dynamicForm = this.formBuilder.group({
        planExercisesArray: new FormArray([])
    });
    this.GetExercise();
    this.UploudPlanDataInForm();
  }

  GetExercise()    
  {      
     this.ExerciseService.getUserExercises(this.authenticationService.currentUserValue.id)
                          .subscribe(exercises => this.Data = exercises);
  } 

  get f() { return this.dynamicForm.controls; }
  get t() { return this.f.planExercisesArray as FormArray; }

  onSubmit() {
      this.submitted = true;
      if (this.dynamicForm.invalid) {
          return;
      }

      if (confirm("Are you sure you want to save changes?(You can't undo it)")) {   
        this.PlanService.deletePlanExercises(this.route.snapshot.paramMap.get('id')).subscribe(()=>
                    this.PlanService.addPlanExercises(this.route.snapshot.paramMap.get('id'), this.dynamicForm.value)
                                    .subscribe(() => {
                                      this.onReset();
                                      this.GetExercise();
                                      this.UploudPlanDataInForm();  
                                    }));
      }   
  }

  onReset() {
      // reset whole form back to initial state
      this.submitted = false;
      this.exercisesNumber = 0;
      this.dynamicForm.reset();
      this.t.clear();
  }

  onClear() {
    // clear errors and reset ticket fields
    this.submitted = false;
    this.t.reset();
  }

  addNewExercise() {
    this.exercisesNumber++;
    for (let i = this.t.length; i < this.exercisesNumber; i++) {
        this.t.push(this.formBuilder.group({
          planId:[this.route.snapshot.paramMap.get('id')],
          exerciseId: ['', [Validators.required]],
          time: [null, [Validators.required]],
        }));
    }
  }

  addExistingExercise(id: any, date: any) {
    this.exercisesNumber++;
    for (let i = this.t.length; i < this.exercisesNumber; i++) {
      this.t.push(this.formBuilder.group({
        planId:[this.route.snapshot.paramMap.get('id')],
        exerciseId: [id, [Validators.required]],
        time: [formatDate(date, 'yyyy-MM-dd', 'en-US'), [Validators.required]],
      }));
    }
  }
  
  delete(index: number) {
    if (this.t.length !== 1) {
      this.t.removeAt(index);
    }
  }

  UploudPlanDataInForm() {  
    this.PlanService.getPlanExercises(this.route.snapshot.paramMap.get('id')).subscribe(Response => {  
        this.PlanExercises = Response;
        this.PlanExercises.forEach(x => this.addExistingExercise(x.id, x.time));
    });  
  }
}
