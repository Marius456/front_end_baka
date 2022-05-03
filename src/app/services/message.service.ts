import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message, NewMessage } from '../entities/message';


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  Url = 'https://localhost:5001/api/messages/';

  constructor(private http:HttpClient) { }  

  getMessages():Observable<Message[]>    
  {    
    return this.http.get<Message[]>(this.Url);    
  } 

  getPlanMessages(PlanId: string):Observable<Message[]>   
  {    
    return this.http.get<Message[]>(this.Url+"plans/"+PlanId);    
  } 
  
  addMessage(Message: NewMessage): Observable<Message> {
    return this.http.post<Message>(this.Url, Message)
  }  

  updateMessage(MessageId: number, Message: Message): Observable<Message> {
    return this.http.put<Message>(this.Url + MessageId, Message)
  }  

  deleteMessage(MessageId:string):Observable<number>    
  {    
    return this.http.delete<number>(this.Url+ MessageId);    
  }
  
  getMessage(MessageId: string): Observable<Message> {    
    return this.http.get<Message>(this.Url + MessageId);    
  }   
}
