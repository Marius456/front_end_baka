import { Component, OnInit } from '@angular/core';
import { Post } from '../../entities/post';  
import { PostService } from '../../services/post.service';   
import { Router } from '@angular/router';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-services',
  templateUrl: './post.component.html'
})
export class PostComponent implements OnInit {

  dataSaved = false;    
  message:string;    
  FromPost: any;    
  Id:number=0;    
  allPosts:Observable<Post[]>;    
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private formbuilder: FormBuilder,
    private PostService:PostService
    ) { 
      if (!this.authenticationService.currentUserValue) {
        this.router.navigate(['/login']);
      }
    }    
  
  ngOnInit(): void {  
    this.FromPost = this.formbuilder.group({  
      Id: [0, [Validators.required]],  
      Name: ['', [Validators.required]],  
      Description: ['', [Validators.required]],  
    });  
      this.GetPost();  
  }

  UpdateId() : void{
    this.FromPost.patchValue({
      Id: this.Id,
    })
  }

  Reset()    
  {    
    
    this.Id = 0;  
    this.FromPost.controls['Name'].setValue('');  
    this.FromPost.controls['Description'].setValue('');  
   // this.FromPost.reset();  
  }

  GetPost()    
  {      
    this.allPosts=this.PostService.getPosts();    
  } 

  CreatePost(Post: Post) {
    Post.userId = parseInt(sessionStorage.getItem("user"), 10);
    if(this.Id != 0){
      this.UpdatePost(this.Id, Post);
    }
    this.PostService.addPost(Post)
    .subscribe(() => {  
            this.dataSaved = true;  
            this.message = 'Record saved Successfully';  
            this.Id = 0;
            this.Reset();  
            this.GetPost();  
        });  
  }

  EditPost(PostId: string) {  
    this.PostService.getPost(PostId).subscribe(Response => {  
        this.message = null;  
        this.dataSaved = false; 
        this.Id = Response.id;  
        this.FromPost.controls['Name'].setValue(Response.name);  
        this.FromPost.controls['Description'].setValue(Response.description);  
    });  
  } 

  UpdatePost(PostId: number, Post: Post) {
    this.PostService.updatePost(PostId, Post)
    .subscribe(() => {  
            this.dataSaved = true;  
            this.message = 'Record saved Successfully';  
            this.Id = 0;
            this.Reset();  
            this.GetPost();  
        });  
  }

  DeletePost(PostId: string) {  
    if (confirm("Are You Sure To Delete this Informations")) {  
        this.PostService.deletePost(PostId).subscribe(  
            () => {  
                this.dataSaved = true;  
                this.message = "Deleted Successfully";  
                this.GetPost();  
            });  
    }     
  }   

  ShowComments(Post: Post){
    sessionStorage.setItem("post", Post.id.toString());
    this.router.navigate(['/comments']);
  }

  IsUserPost(Post: Post){
    return Post.userId.toString()===sessionStorage.getItem("user");
  }
  
}
