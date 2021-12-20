import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private socket;

  constructor() { }

  connect(): Subject<MessageEvent>{
    this.socket = io(environment.wsUrl);
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconect();
      };
    });

    let observer = {
      next: (data: object) => {
        this.socket.emit('message', JSON.stringify(data));
      },
    };

    return Subject.create(observer, observable);

  }

  joinRoom(room){
    this.socket = io(environment.wsUrl);
    const user = JSON.parse(localStorage.getItem('currentUser'));
    this.socket.emit('join', {username: user.username, room});
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
      this.socket.on('roomData', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconect();
      };
    });
    return observable;
  }


}
