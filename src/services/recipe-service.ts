import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth-service';
import { Recipe } from 'src/models/recipe';

@Injectable({
    providedIn:'root',
})
export class RecipeService {
    apiUrl = 'https://localhost:5022/CookingCompassAPI/Recipe'

    constructor(private httpClient: HttpClient, private authService: AuthService){}

    private getAuthHeaders(): HttpHeaders {
        const token = this.authService.getToken();
        return new HttpHeaders({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        });
    }

    getRecipeById(id :number): Observable<Recipe> {
        return this.httpClient.get<Recipe>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() })
            .pipe(catchError(this.handleError));
    }

    update(Id: number): Observable<Recipe> {
        return this.httpClient.post<Recipe>(`${this.apiUrl}/${Id}`, { headers: this.getAuthHeaders() })
            .pipe(catchError(this.handleError));
    }

    getAll(): Observable<Recipe[]> {
        return this.httpClient.get<Recipe[]>(this.apiUrl, { headers: this.getAuthHeaders() })
            .pipe(catchError(this.handleError));
    }

    save(recipeDTO: Recipe): Observable<Recipe> {
       
        return this.httpClient.post<Recipe>(this.apiUrl, recipeDTO, { headers: this.getAuthHeaders() })
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
