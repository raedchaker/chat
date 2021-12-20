import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Message } from '../_models/message';
import { WebSocketService } from './web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  message: Subject<any>;

  constructor(private http: HttpClient, private wsService: WebSocketService) {
    // this.message = wsService.connect().pipe(map((response: any): any => {
    //   return response;
    // })) as Subject<any>;
  }

  // tslint:disable-next-line: typedef
  getChatByRoomId(roomId){
    return this.http.get<Message[]>(`${environment.apiUrl}/message/room/${roomId}`);
  }

  // tslint:disable-next-line: typedef
  sendMessage(payload){
    this.message.next(payload);
    // return this.http.post(`${environment.apiUrl}/message/send`, payload);
  }
}
