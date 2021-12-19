import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Message } from '../_models/message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  getChatByRoomId(roomId){
    return this.http.get<Message[]>(`${environment.apiUrl}/message/room/${roomId}`);
  }
}
