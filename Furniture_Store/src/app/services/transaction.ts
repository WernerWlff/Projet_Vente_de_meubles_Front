import { Injectable } from '@angular/core';
import { Furniture } from './furniture';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Transaction{
  id: number,
  furniture_id: Furniture,
  user_id: User,
  sold_at: Date
}

@Injectable({
  providedIn: 'root',
})
export class Transaction {
  private apiUrl = "./api/transactions"
  
  constructor(private http : HttpClient) {}

  getAllTransactions(): Observable<Transaction[]>{
    return this.http.get<Transaction[]>(this.apiUrl);
  }

  addTransaction(transaction: Transaction): Observable<Transaction>{
    return this.http.post<Transaction>(this.apiUrl, transaction);
  }

  updateTransaction(id: number, transaction: Transaction): Observable<Transaction>{
    return this.http.put<Transaction>(`${this.apiUrl}/${id}`, transaction);
  }

  deleteTransaction(id: number): Observable<Transaction>{
    return this.http.delete<Transaction>(`${this.apiUrl}/${id}`);
  }
}
