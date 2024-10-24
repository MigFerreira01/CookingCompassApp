import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';


export interface User {
  name: string;
  email: string;
  password: string;
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
    return this.http.post<{token: string}>(`${this.apiUrl}/login`, body, { headers})
    .pipe(
      tap((response )=> {
        localStorage.setItem('jwtToken', response.token);
      }),
      catchError(this.handleError<string>('login'))
    );
  }
  
  logout(): void {
    // Remove the token on logout
    sessionStorage.removeItem('jwtToken');
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getCurrentUser(): {email: string | null; isAdmin : boolean} {
    const token = this.getToken();
    if (!token) {
      return { email: null, isAdmin: false };
    }

    const payload = this.parseJwt(token);
    return {
      email: payload?.email || null,
      isAdmin: payload?.IsAdmin || false,
    }
  }

  private parseJwt(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(escape(window.atob(base64)));
    return JSON.parse(jsonPayload);
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