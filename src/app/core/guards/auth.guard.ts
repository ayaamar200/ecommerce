import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  // Inject the Programming router
  const router = inject(Router);
  // Inject the PLATFORM_ID
  const platformId = inject(PLATFORM_ID);

  // Check if the user is logged in
  if (isPlatformBrowser(platformId)) {
    if (localStorage.getItem('userToken')) {
      return true;
    } else {
      // If not, redirect to the login page
      router.navigate(['/login']);
      return false;
    }
  } else {
    return false;
  }
};
