import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Exercise } from './../../entities/exercise';
import { AuthenticationService } from './../../services/authentication.service';
import { ExerciseService } from './../../services/exercise.service';

@Component({
  selector: 'admin-exercises',
  templateUrl: './ShowExercises.component.html',
  styleUrls: ['./ShowExercises.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShowExercisesComponent implements OnInit{
   Data:Exercise[];   
   constructor(
      private authenticationService: AuthenticationService,
      private ExerciseService:ExerciseService
   ) { 
   }    
   
   ngOnInit(): void {  
       this.GetExercise();  
   }
 
   
    GetExercise()    
    {      
      this.ExerciseService.getUserExercises(this.authenticationService.currentUserValue.id)
                            .subscribe(exercises => this.Data = exercises);
    } 

   DeleteExercise(ExerciseId: string) {  
     if (confirm("Are You Sure To Delete this Informations")) {  
         this.ExerciseService.deleteExercise(ExerciseId).subscribe(  
             () => {  
                 this.GetExercise();  
             });  
     }     
   }  
}
