import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token'); // Check if the token exists

  if (token) {
    return true; // Allow access if the token exists
  } else {
    router.navigate(['/login']); // Redirect to login if not authenticated
    return false; // Prevent access
  }
};