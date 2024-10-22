import { inject, Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Injecting AuthService
  const router = inject(Router); // Injecting Router

  if (authService.isLoggedIn()) {
      return true;
  } else {
      router.navigate(['/login']); // Redirect to login if not authenticated
      return false;
  }
}