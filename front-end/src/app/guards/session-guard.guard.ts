// auth-guard.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service'; // Asegúrate de que la ruta sea correcta
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserResponse } from '../interfaces/UserInfo';

@Injectable({
  providedIn: 'root',
})
export class SessionGuardGuard implements CanActivate {
  constructor(private authService: AuthServiceService, private router: Router) {}

  canActivate(): Observable<boolean> {
    const token = localStorage.getItem('token');

    if (token) {
      return this.authService.getUser().pipe(
        map((user: UserResponse) => {
          if (user && user.findUser) {
            this.router.navigate(['/eldar']);
            return false;
          } else {
            return true;
          }
        })
      );
    } else {
      return new Observable<boolean>(observer => observer.next(true));
    }
  }
}
