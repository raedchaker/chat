import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'src/app/_models/message';
import { Room } from 'src/app/_models/room';
import { ChatService } from 'src/app/_services/chat.service';
import { RoomService } from 'src/app/_services/room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  room: Room = new Room();
  messages: Message[] = [];
  constructor(private chatService: ChatService,private roomService: RoomService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.roomService.getRoomById(params.id).subscribe(res => {
        this.room = res;
      });
      this.chatService.getChatByRoomId(params.id).subscribe(res => {
        this.messages = res;
        console.log(res);
      });
    });
  }

  leave(){
    this.router.navigate(['/chat/list']);
  }

}
