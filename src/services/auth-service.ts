import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';


export interface User {
  name: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:5022/CookingCompassAPI/User'

  constructor(private http: HttpClient) {}

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }


  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email, password };
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, body, { headers })
    .pipe(
      tap((response: LoginResponse)=> {
        sessionStorage.setItem('jwtToken', response.token);
      }),
      catchError(this.handleError<LoginResponse>('login'))
    );
  }
  
  logout(): void {
    // Remove the token on logout
    localStorage.removeItem('jwtToken');
  }

  getToken(): string | null {
    return sessionStorage.getItem('jwtToken');
  }
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getProtectedData(): Observable<any> {
    const token = this.getToken();  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,  
    });

    return this.http.get<any>(`${this.apiUrl}/protected-route`, { headers })
      .pipe(
        catchError(this.handleError<any>('getProtectedData'))
      );
    }
  }