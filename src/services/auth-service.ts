import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Return true if token exists
  }

  logout() {
    localStorage.removeItem('token'); // Clear the token on logout
  }
}