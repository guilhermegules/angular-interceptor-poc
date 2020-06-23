import { User } from './../models/user.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:4200/users');
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`http://localhost:4200/users/${id}`);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:4200/users', user);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`http://localhost:4200/users/${id}`, user);
  }

  removeUser(id: number): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: id
    };
    return this.http.delete<User>(`http://localhost:4200/users`, httpOptions);
  }
}
