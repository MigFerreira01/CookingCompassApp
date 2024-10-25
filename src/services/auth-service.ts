import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, Subject, tap, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';


export interface User {
  id: number;
  name: string;
  email: string;
  isAdmin:boolean;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:5022/CookingCompassAPI/User'
  
  private loginStatus = new Subject<boolean>

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
        this.loginStatus.next(true)
      }),
      catchError((error: any) => {
        let errorMsg = '';
        
        // Check the type of error and assign the message accordingly
        if (error.status === 401) {
          errorMsg = 'Invalid login credentials. Please try again.';
        } else if (error.status === 400) {
          errorMsg = 'There was an issue with your request. Please check your input.';
        } else {
          errorMsg = 'An unexpected error occurred. Please try again later.';
        }

        
        console.error('Login error: ', error);
        
        
        return throwError(() => new Error(errorMsg));
      })
    )
  }
  
  logout(): void {    
    // Remove the token on logout
    localStorage.removeItem('jwtToken');
    this.loginStatus.next(false)
  }

  getLoginStatus() {
    return this.loginStatus.asObservable();
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

      decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      console.error('Invalid token', Error);
      return null;
    }
  }

  getCurrentUserId(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      return decodedToken?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] || null;
    }
    return null;
  }
}
