import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const logedGuard: CanActivateFn = (route, state) => {
  // Inject the Programming router
  const router = inject(Router);

  // Inject the PLATFORM_ID
  const platformId = inject(PLATFORM_ID);

  // Check if the user is logged in
  if (isPlatformBrowser(platformId)) {
    if (localStorage.getItem('userToken')) {
      // redirect to the home page
      router.navigate(['/home']);
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};
