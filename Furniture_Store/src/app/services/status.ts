import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Status{
  id: number,
  status: string
}

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  private apiUrl = "./api/status"

  constructor(private http: HttpClient) {}

  getAllStatus(): Observable<Status[]> {
    return this.http.get<Status[]>(this.apiUrl);
  }
}
