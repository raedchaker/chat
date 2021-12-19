import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from 'src/app/_models/room';
import { RoomService } from 'src/app/_services/room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  room: Room = new Room();
  constructor(private roomService: RoomService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.roomService.getRoomById(params.id).subscribe(res => {
        this.room = res;
      });
    });
  }

  leave(){
    this.router.navigate(['/chat/list']);
  }

}
