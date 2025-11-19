import { Injectable } from '@angular/core';

export interface Status{
  id: number,
  status: string
}

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  private apiUrl = "./api/status"
}
