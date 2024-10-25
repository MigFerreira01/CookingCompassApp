import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from 'src/models/user';
import { AuthService } from './auth-service';

@Injectable({
    providedIn:'root',
})
export class UserService {
    apiUrl = 'https://localhost:5022/CookingCompassAPI/User'

    constructor(private httpClient: HttpClient, private authService: AuthService){}

    private getAuthHeaders(): HttpHeaders {
        const token = this.authService.getToken();
        return new HttpHeaders({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        });
    }

    getAll(): Observable<User[]> {
        return this.httpClient.get<User[]>(this.apiUrl, { headers: this.getAuthHeaders() })
            .pipe(catchError(this.handleError));
    }

    updateUser(userDTO: User): Observable<User> {
        return this.httpClient.post<User>(`${this.apiUrl}/Update`, userDTO, { headers: this.getAuthHeaders() })
            .pipe(catchError(this.handleError));
    }

    getUserWithRecipes(name: string ): Observable<User> {
        return this.httpClient.get<User>(`${this.apiUrl}/username/${name}`, { headers: this.getAuthHeaders() })
            .pipe(catchError(this.handleError));
    }

    getUserById(id: number): Observable<User> {
        return this.httpClient.get<User>(`${this.apiUrl}/userId/${id}`, { headers: this.getAuthHeaders() })
            .pipe(catchError(this.handleError));
    }

    save(userDTO: User): Observable<User> {
        return this.httpClient.post<User>(`${this.apiUrl}/register`, userDTO, { headers: this.getAuthHeaders() })
            .pipe(catchError(this.handleError));
    }

    delete(id: number): Observable<void> {
        return this.httpClient.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() })
            .pipe(catchError(this.handleError));
    }

    private handleError(error: any) {
        console.error('An error occurred:', error);
        return throwError(error);
    }
}
