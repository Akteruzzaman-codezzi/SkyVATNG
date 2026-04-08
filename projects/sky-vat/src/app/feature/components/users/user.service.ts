import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);
  private baseUrl = 'https://jsonplaceholder.typicode.com/users';

  getUsers() {
    return this.http.get<any[]>(this.baseUrl);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  createUser(user: Omit<any, 'id'>): Observable<any> {
    return this.http.post<any>(this.baseUrl, user);
  }

  updateUser(id: number, changes: Partial<any>): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, changes);
  }

  deleteUser(id: number): Observable<unknown> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
