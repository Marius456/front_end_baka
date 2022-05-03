import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Exercise } from './../../entities/exercise';
import { AuthenticationService } from './../../services/authentication.service';
import { ExerciseService } from './../../services/exercise.service';
import { PlanService } from './../../services/plan.service';
import { UserService } from './../../services/user.service';
declare var $ : any;
type GUID = string & { isGuid: true};

@Component({
  selector: 'admin-add-exercise',
  templateUrl: './AddExercise.component.html',
  styleUrls: ['./AddExercise.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddExerciseComponent implements OnInit{
   dataSaved = false;    
   message:string;    
   FromExercise: FormGroup;    
   Id: GUID;    
   submitted = false;
   
   constructor(
      private authenticationService: AuthenticationService,
      private formbuilder: FormBuilder,
      private route: ActivatedRoute,
      private ExerciseService: ExerciseService
      ) 
   { 
      if(this.route.snapshot.paramMap.get('id'))
      {
         this.UploudPlanDataInForm(this.route.snapshot.paramMap.get('id'));
      }
    }    

   ngOnInit(): void {  
      this.FromExercise = this.formbuilder.group({  
         Id: [null],  
         Title: ['', [Validators.required]],  
         Text: ['', [Validators.required]],  
      });  
      }

   ngAfterViewInit()
   {
      $(".add-listing-section").each(function() {

         var switcherSection = $(this);
         var switcherInput = $(this).find('.switch input');

         if(switcherInput.is(':checked')){
            $(switcherSection).addClass('switcher-on');
         }

         switcherInput.change(function(){
            if(this.checked===true){
               $(switcherSection).addClass('switcher-on');
            } else {
               $(switcherSection).removeClass('switcher-on');
            }
         });

      });
   }
   
   get f() { return this.FromExercise.controls; }

   UpdateId() : void{
      this.FromExercise.patchValue({
         Id: this.Id,
      })
      }

   CreateExercise(Exercise: Exercise) {
      this.submitted = true;
      if (this.FromExercise.invalid) {
            return;
      }
      Exercise.userId = this.authenticationService.currentUserValue.id;

      if(this.Id != null){
         this.UpdateExercise(this.Id, Exercise);
      }

      this.ExerciseService.addExercise(Exercise)
                           .subscribe(() => {  
                                    this.dataSaved = true;  
                                    this.message = 'Record saved Successfully';  
                                    this.Id = null;
                                    this.Reset();  
                                 });  
      }

   UpdateExercise(ExerciseId: GUID, Exercise: Exercise) {
      this.ExerciseService.updateExercise(ExerciseId, Exercise)
                           .subscribe(() => {  
                                    this.dataSaved = true;  
                                    this.message = 'Record saved Successfully';  
                                    this.Id = null;
                                    this.Reset();  
                                 });  
      }

   UploudPlanDataInForm(ExerciseId: string) {  
      this.ExerciseService.getExercise(ExerciseId).subscribe(Response => {  
          this.message = null;  
          this.dataSaved = false; 
          this.Id = Response.id;  
          this.FromExercise.controls['Title'].setValue(Response.title);  
          this.FromExercise.controls['Text'].setValue(Response.text);  
      });  
   }

   Reset()    
   {    
      this.Id = null;  
      this.FromExercise.controls['Title'].setValue('');  
      this.FromExercise.controls['Text'].setValue('');  
      this.submitted = false;
   }
}
