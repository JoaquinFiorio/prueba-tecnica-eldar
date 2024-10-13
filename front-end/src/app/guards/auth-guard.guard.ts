import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserResponse } from '../interfaces/UserInfo';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard implements CanActivate {
  constructor(private authService: AuthServiceService, private router: Router) {}

  canActivate(): Observable<boolean> {
    const token = localStorage.getItem('token');

    if (token) {
      return this.authService.getUser().pipe(
        map((user: UserResponse) => {
          if (user && user.findUser) {
            const isAdmin = user.findUser.rol === 'ADMIN';
            this.authService.isAdmin.next(isAdmin); 

            return true;
          } else {
            this.router.navigate(['/401']);
            return false;
          }
        }),
        catchError(() => {
          this.router.navigate(['/401']);
          return of(false);
        })
      );
    } else {
      this.router.navigate(['/401']);
      return of(false);
    }
  }
}
