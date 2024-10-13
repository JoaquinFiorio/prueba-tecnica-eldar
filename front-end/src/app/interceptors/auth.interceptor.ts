import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, finalize, throwError } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';
import { AuthServiceService } from '../services/auth-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private readonly spinnerService: SpinnerService, private readonly authService: AuthServiceService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Obtén el token de autenticación desde donde sea que lo tengas almacenado
    this.spinnerService.show();
    const authToken = localStorage.getItem("token");

    // Clona la solicitud y agrega el encabezado de autorización con el token
    const authRequest = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${authToken}`)
    });

    // Continúa con la solicitud modificada
    return next.handle(authRequest).pipe(
      finalize(() => this.spinnerService.hide()),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authService.isAuth.next(true);
        }
        return throwError(() => error);
      })
    );
  }
}
