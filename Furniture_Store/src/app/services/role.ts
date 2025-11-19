import { Injectable } from '@angular/core';

export interface Role{
  id : number,
  role : string
}

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private apiUrl = "./api/roles";
}
