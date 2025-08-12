// src/app/interceptors/error.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private notificationService: NotificationService,
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        
        // --- LÓGICA DE REFRESH AUTOMÁTICO ---
        if (error.status === 401 && !request.url.includes('/api/login') && !request.url.includes('/api/refresh-token')) {
          return this.handle401Error(request, next);
        }

        // --- MANEJO DE OTROS ERRORES ---
        let title = 'Error';
        let description = 'Ocurrió un error inesperado.';

        if (error.status === 422 && error.error?.errors?.[0]) {
          title = `Error de validación en '${error.error.errors[0].field}'`;
          description = error.error.errors[0].message;
        } else if (error.error?.message) {
          title = error.error.message; // El mensaje principal de nuestra excepción
          description = error.error.description || ''; // La descripción
        } else if (error.status === 0) {
          title = 'Error de Conexión';
          description = 'No se pudo conectar con el servidor.';
        }
        
        this.notificationService.showError(title, description);
        return throwError(() => error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((respuesta: any) => {
          this.isRefreshing = false;
          const newToken = respuesta.data.token.token;
          this.refreshTokenSubject.next(newToken);
          return next.handle(this.addTokenToRequest(request, newToken));
        }),
        catchError((err) => {
          this.isRefreshing = false;
          this.authService.cerrarSesion();
          // El error de cierre de sesión ya es manejado por el interceptor, no mostramos doble mensaje.
          return throwError(() => err);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => next.handle(this.addTokenToRequest(request, jwt)))
      );
    }
  }

  private addTokenToRequest(request: HttpRequest<any>, token: string) {
    return request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }
}