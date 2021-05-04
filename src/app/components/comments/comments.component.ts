import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/entities/user';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Comment } from '../../entities/comment';
import { AuthenticationService } from '../../services/authentication.service';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html'
})
export class CommentsComponent implements OnInit {

  allUsers:Observable<User[]>; 
  foundUser:Observable<User>;
  dataSaved = false;    
  message:string;    
  FromComment: any;    
  Id:number=0;    
  allComments:Observable<Comment[]>;    
  constructor(
    private formbuilder: FormBuilder,
    private CommentService:CommentService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private UserService:UserService) {
      if (!this.authenticationService.currentUserValue) {
        this.router.navigate(['/login']);
    }
     }    
  
  ngOnInit(): void {  
    this.FromComment = this.formbuilder.group({  
      Id: [0, [Validators.required]],  
      Text: ['', [Validators.required]],  
    });  
      this.GetComment();  
  }

  UpdateId() : void{
    this.FromComment.patchValue({
      Id: this.Id,
    })
  }

  Reset()    
  {    
    this.Id = 0;  
    this.FromComment.controls['Text'].setValue('');  
   // this.FromComment.reset();  
  }

  GetComment()    
  {      
    this.allComments=this.CommentService.getPostComments(sessionStorage.getItem("post"));    
    this.allUsers= this.UserService.getUsers(); 
  } 
  
  GetUser(id : string)    
  {         
    this.foundUser = this.UserService.getUser(id); 
  } 

  CreateComment(Comment: Comment) {
    Comment.userId = parseInt(sessionStorage.getItem("user"), 10);
    Comment.postId = parseInt(sessionStorage.getItem("post"), 10);
    if(this.Id != 0){
      this.UpdateComment(this.Id, Comment);
    }
    this.CommentService.addComment(Comment)
    .subscribe(() => {  
            this.dataSaved = true;  
            this.message = 'Record saved Successfully';  
            this.Id = 0;
            this.Reset();  
            this.GetComment();  
        });  
  }

  EditComment(CommentId: string) {  
    this.CommentService.getComment(CommentId).subscribe(Response => {  
        this.message = null;  
        this.dataSaved = false; 
        this.Id = Response.id;  
        this.FromComment.controls['Text'].setValue(Response.text);  
    });  
  } 

  UpdateComment(CommentId: number, Comment: Comment) {
    this.CommentService.updateComment(CommentId, Comment)
    .subscribe(() => {  
            this.dataSaved = true;  
            this.message = 'Record saved Successfully';  
            this.Id = 0;
            this.Reset();  
            this.GetComment();  
        });  
  }

  DeleteComment(CommentId: string) {  
    if (confirm("Are You Sure To Delete this Informations")) {  
        this.CommentService.deleteComment(CommentId).subscribe(  
            () => {  
                this.dataSaved = true;  
                this.message = "Deleted Successfully";  
                this.GetComment();  
            });  
    }     
  }  

  IsUserComment(Comment: Comment){
    if(sessionStorage.getItem("user")===null)
      return false;
    return Comment.userId.toString()===sessionStorage.getItem("user");
  }

}
