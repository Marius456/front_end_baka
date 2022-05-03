import { UserService } from './../../services/user.service';
import { Plan } from './../../entities/plan';
import { PlanService } from './../../services/plan.service';
import { MessageService } from './../../services/message.service';
import { Message } from './../../entities/message';
import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'admin-messages',
  templateUrl: './Messages.component.html',
  styleUrls: ['./Messages.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MessagesComponent implements OnInit{
  FromMessage: FormGroup;    
  submitted = false;
  CreatedPlans: Plan[];   
  FollowedPlans: Plan[];   
  SelectedPlanMessages: Message[];   
  selectedPlan: Plan;
  userId: any;

  constructor(
    private authenticationService: AuthenticationService,
    private formbuilder: FormBuilder,
    private MessageService: MessageService,
    private UserService: UserService,
    private PlanService: PlanService
    ) 
    { 
    }    


    ngOnInit(): void 
    {  
      this.FromMessage = this.formbuilder.group({  
         Text: ['', [Validators.required]],  
      });  
      this.GetPlan();  
    }
      
    get f() { return this.FromMessage.controls; }

    CreateMessage(Message: Message) {
      this.submitted = true;
      if (this.FromMessage.invalid) {
            return;
      }
      Message.time = new Date();
      Message.planId = this.selectedPlan.id;
      Message.userId = this.authenticationService.currentUserValue.id;
      this.MessageService.addMessage(Message)
                          .subscribe(() => {  
                                  this.Reset();  
                                  this.GetMessages();
                                });  
    }


    Reset()    
    {    
      this.FromMessage.controls['Text'].setValue('');  
      this.submitted = false;
    }

    GetPlan()    
    {  
       this.PlanService.getUserPlans(this.authenticationService.currentUserValue.id).subscribe(plans => this.CreatedPlans = plans);    
       this.UserService.getUserBookmarkPlans(this.authenticationService.currentUserValue.id).subscribe(bookmarks => this.FollowedPlans = bookmarks);

    } 

    selectPlan(plan: Plan){
      this.selectedPlan = plan;
      this.GetMessages();
      this.userId = this.authenticationService.currentUserValue.id;
    }

    GetMessages()
    {
      this.MessageService.getPlanMessages(this.selectedPlan.id).subscribe(messages => this.SelectedPlanMessages = messages);
    }
}
