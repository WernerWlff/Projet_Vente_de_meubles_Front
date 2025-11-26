import { Injectable } from '@angular/core';
import { Type } from './type';
import { Status } from './status';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Furniture{
  id: number,
  title: string,
  type: Type,
  description: string,
  price: number,
  status: Status,
  created_at: Date,
  photo: string,
  user: User
}

@Injectable({
  providedIn: 'root',
})
export class furnitureService {
  private apiUrl = "/api/furnitures"

  constructor(private http: HttpClient) {}

  getAllFurnitures(): Observable<Furniture[]>{
    return this.http.get<Furniture[]>(this.apiUrl);
  }

  addFurniture(furniture: Furniture): Observable<Furniture>{
    return this.http.post<Furniture>(this.apiUrl, furniture);
  }

  updateFurniture(id : number, furniture: Furniture): Observable<Furniture>{
    return this.http.put<Furniture>(`${this.apiUrl}/${id}`, furniture);
  }

  deleteFurniture(id: number): Observable<Furniture>{
    return this.http.delete<Furniture>(`${this.apiUrl}/${id}`);
  }
}
