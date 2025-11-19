import { Injectable } from '@angular/core';
import { Type } from './type';
import { Status } from './status';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Furniture{
  id: number,
  title: string,
  type_id: Type,
  description: string,
  price: number,
  status_id: Status,
  created_at: Date,
  photo: string,
  vendor_id: User
}

@Injectable({
  providedIn: 'root',
})
export class Furniture {
  private apiUrl = "./api/furnitures"

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
