import { Injectable } from '@angular/core';

export interface Type{
  id: number,
  type: string
}

@Injectable({
  providedIn: 'root',
})
export class Type {
  private apiUrl = "./api/types"
}
