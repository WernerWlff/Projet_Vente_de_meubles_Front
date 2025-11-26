import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

export interface JwtPayload{
  sub : string,
  iat : number,
  exp : number,
  role?: string
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = "/api";

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, {email, password});
  }

  setToken(token: string){
    return localStorage.setItem('Token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('Token');
  }

  clearToken() {
    localStorage.removeItem('Token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    this.clearToken();
  }

  getUserInfo(): JwtPayload | null {
    const token = this.getToken();
    if(!token) {
      return null
    }
    try{
      return jwtDecode<JwtPayload>(token);
    }catch(error){
      console.error("Erreur lors du décodage du token :", error);
      return null;
    }
  }

  getUsername(): string | null {
    const userInfo = this.getUserInfo();
    return userInfo ? userInfo.sub : null;
  }

  getUserRole(): string | null {
    const userInfo = this.getUserInfo();
    return userInfo ? userInfo.role || null : null;
  }
}
