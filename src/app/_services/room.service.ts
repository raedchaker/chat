import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Room } from '../_models/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: typedef
  getRoomById(id){
    return this.http.get<Room>(`${environment.apiUrl}/room/${id}`);
  }

  createRoom(name){
    return this.http.post<Room>(`${environment.apiUrl}/room`, name);
  }

  getMyRooms(){
    return this.http.get<[]>(`${environment.apiUrl}/room/rooms`);
  }
}
