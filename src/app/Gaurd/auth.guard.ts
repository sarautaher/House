import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const userToken = localStorage.getItem('userToken');
  if (userToken !== null) {
    return true;
  } else {
    const router = new Router();
    router.navigate(['/House']);
    return false;
  }
};
