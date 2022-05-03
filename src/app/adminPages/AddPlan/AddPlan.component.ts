import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Plan } from './../../entities/plan';
import { AuthenticationService } from './../../services/authentication.service';
import { PlanService } from './../../services/plan.service';
declare var $ : any;
type GUID = string & { isGuid: true};

@Component({
  selector: 'admin-add-list',
  templateUrl: './AddPlan.component.html',
  styleUrls: ['./AddPlan.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddPlanComponent implements OnInit{
   selectedFile : File = null;
   dataSaved = false;    
   message:string;    
   FromPlan: FormGroup;    
   Id: GUID;    
   allPlans:Observable<Plan[]>;   
   submitted = false;
   
   constructor(
      private authenticationService: AuthenticationService,
      private formbuilder: FormBuilder,
      private PlanService: PlanService,
      private route: ActivatedRoute
      ) 
   { 
      if(this.route.snapshot.paramMap.get('id'))
      {
         this.UploudPlanDataInForm(this.route.snapshot.paramMap.get('id'));
      }
    }    

   ngOnInit(): void {  
      this.FromPlan = this.formbuilder.group({  
         Id: [null],  
         Name: ['', [Validators.required]],  
         Category: ['', [Validators.required]],  
         Description: ['', [Validators.required]],  
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
   
   get f() { return this.FromPlan.controls; }

   UpdateId() : void{
      this.FromPlan.patchValue({
         Id: this.Id,
      })
      }

   CreatePlan(Plan: Plan) {
      this.submitted = true;
      if (this.FromPlan.invalid) {
         return;
      }
      Plan.userId = this.authenticationService.currentUserValue.id;
      Plan.state = 0;
      if(this.Id != null){
         this.UpdatePlan(this.Id, Plan);
      }
      this.PlanService.addPlan(Plan)
                     .subscribe(() => {  
                           this.dataSaved = true;  
                           this.message = 'Record saved Successfully';  
                           this.Id = null;
                           this.Reset();  
                        });  
   }

   UpdatePlan(PlanId: GUID, Plan: Plan) {
      this.PlanService.updatePlan(PlanId, Plan)
      .subscribe(() => {  
            this.dataSaved = true;  
            this.message = 'Record saved Successfully';  
            this.Id = null;
            this.Reset();   
         });  
   }

   UploudPlanDataInForm(PlanId: string) {  
      this.PlanService.getPlan(PlanId).subscribe(Response => {  
          this.message = null;  
          this.dataSaved = false; 
          this.Id = Response.id;  
          this.FromPlan.controls['Name'].setValue(Response.name);  
          this.FromPlan.controls['Category'].setValue(Response.category);  
          this.FromPlan.controls['Description'].setValue(Response.description);  
      });  
    } 
   
   Reset()    
   {    
      this.Id = null;  
      this.FromPlan.controls['Name'].setValue('');  
      this.FromPlan.controls['Category'].setValue('');  
      this.FromPlan.controls['Description'].setValue('');  
      this.submitted = false;
   }
   
  onSelectedFile(e)
  {
      this.selectedFile = e.target.files[0];
  }

  linkItem()
  {
      var formData = new FormData();
      formData.append("file", this.selectedFile, this.selectedFile.name)
      this.PlanService.linkItemToIcon(this.Id, formData)
                      .subscribe(
                        r => console.log(r),
                        err => console.log(err)
                        )
  }
}
