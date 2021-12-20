import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from 'src/app/_models/message';
import { Room } from 'src/app/_models/room';
import { ChatService } from 'src/app/_services/chat.service';
import { RoomService } from 'src/app/_services/room.service';
import { WebSocketService } from 'src/app/_services/web-socket.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  content: string;
  roomId = '';
  room: Room = new Room();
  messages: Message[] = [];
  message: Subject<any>;

  constructor(
    private wsService: WebSocketService,
    private chatService: ChatService,
    private roomService: RoomService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.roomId = params.id;
      this.roomService.getRoomById(params.id).subscribe(res => {
        this.room = res;
      });
      this.chatService.getChatByRoomId(params.id).subscribe(res => {
        this.messages = res;
        console.log(res);
      });
      this.message = this.wsService.joinRoom(this.roomId).pipe(map((response: any): any => {
        return response;
      })) as Subject<any>;
      this.message.subscribe(data =>{
        console.log(data);
      });
    });
  }

  leave() {
    this.router.navigate(['/chat/list']);
  }

  sendMessage() {
    const msg = this.content.trim();
    if (msg) {
      this.message.next(msg);
      // this.chatService.sendMessage(msg);
      //   this.chatService.sendMessage({content: msg, room: this.roomId}).subscribe(res => {
      //   console.log(res);
      //   this.content = '';
      // });
    }
  }

}
