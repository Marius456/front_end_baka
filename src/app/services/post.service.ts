import { Injectable } from '@angular/core';     
import { Observable } from 'rxjs';    

import {HttpClient} from '@angular/common/http';    
import {HttpHeaders} from '@angular/common/http'; 
import { Post, NewPost } from '../entities/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  Url = 'https://localhost:5001/api/posts/';

  constructor(private http:HttpClient) { }  

  getPosts():Observable<Post[]>    
  {    
    return this.http.get<Post[]>(this.Url);    
  } 

  addPost(Post: NewPost): Observable<Post> {
    return this.http.post<Post>(this.Url, Post)
  }  

  updatePost(PostId: number, Post: Post): Observable<Post> {
    return this.http.put<Post>(this.Url + PostId, Post)
  }  

  deletePost(PostId:string):Observable<number>    
  {    
    return this.http.delete<number>(this.Url+ PostId);    
  }
  
  getPost(PostId: string): Observable<Post> {    
    return this.http.get<Post>(this.Url + PostId);    
  }   
}
