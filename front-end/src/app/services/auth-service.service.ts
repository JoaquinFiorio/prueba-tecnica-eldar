import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginForm } from '../interfaces/LoginForm';
import { Observable, BehaviorSubject, Subject } from 'rxjs'
import { RegisterUser } from '../interfaces/RegisterUser';
import { MessageRepsonse } from '../interfaces/MessageResponse';
import { LoginResponse } from '../interfaces/LoginResponse';
import { UserInfo, UserResponse } from '../interfaces/UserInfo';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  url: string = 'http://localhost:3000/api/eldar';
  isAuth = new Subject<boolean>();
  isAdmin = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  registerUser(form: RegisterUser): Observable<MessageRepsonse> {
    return this.http.post<MessageRepsonse>(`${this.url}/register`, form);
  }

  loginUser(form: LoginForm): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.url}/login`, form);
  }

  getUser(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.url}/get-user`);
  }

  updateUser(form: UserInfo): Observable<MessageRepsonse> {
    return this.http.put<MessageRepsonse>(`${this.url}/update-user`, form);
  }
}
