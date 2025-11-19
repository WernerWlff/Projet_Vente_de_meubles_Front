import { Injectable } from '@angular/core';
import { Role } from './role';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface user{
  id: number,
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  role_id: Role,
  created_at: Date,
  updated_at: Date
}

@Injectable({
  providedIn: 'root',
})
export class User {
  private apiUrl = "./api/users"

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id:number): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/${id}`);
  }
}
