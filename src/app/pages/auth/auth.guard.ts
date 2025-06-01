import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';

export const authGuard: CanActivateFn = async(route, state) => {
  const router = inject(Router);
  const auth = inject(Auth);

// Wait for Firebase to tell us if user is logged in
  const user = await new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      resolve(user);
      console.log("user resolved");
    });
  });
  


  if (user) {
    return true;
  }

  router.navigate(['/auth/login']);
  return false;
};
