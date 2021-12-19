import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Room } from 'src/app/_models/room';
import { RoomService } from 'src/app/_services/room.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {

  createRoomForm = new FormGroup({
    label: new FormControl('', Validators.required),
  });
  constructor(private roomService: RoomService, private router: Router) { }
  roomList: Room[] = [];
  ngOnInit(): void {
    this.roomService.getMyRooms().subscribe(res => {
      this.roomList = res;
      console.log(res);
    });
  }

  createRoom(){
    this.roomService.createRoom(this.createRoomForm.value).subscribe(res => {
      console.log(res);
      this.roomList.push(res);
    });
  }

  openRoom(roomId){
    this.router.navigate(['/chat/room', roomId]);
  }

}
