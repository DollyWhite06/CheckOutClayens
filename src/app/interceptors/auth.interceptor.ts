import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { environment } from '../../enviroments/enviroment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Obtenemos el token de acceso desde el servicio de autenticación
    const token = this.authService.obtenerTokenAcceso();
    
    // Verificamos si la petición va a nuestra API
    const isApiUrl = request.url.startsWith(environment.apiUrl);

    // Si tenemos un token y la petición es para nuestra API, clonamos la petición
    // y le añadimos el header de autorización.
    if (token && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // Dejamos que la petición (original o clonada con el token) continúe su camino.
    return next.handle(request);
  }
}