import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  static userSubject: ReplaySubject<User | null> = new ReplaySubject(1);

  set user(user: User | null) {
    AuthService.userSubject.next(user);
  }

  get user$(): Observable<User | null> {
    return AuthService.userSubject.asObservable();
  }

  login(payload) {
    return this.http.post<any>('http://localhost:3000/api/users/log-in', payload);
  }

  register(payload) {
    return this.http.post<any>('http://localhost:3000/api/users/sign-up', payload);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

}
