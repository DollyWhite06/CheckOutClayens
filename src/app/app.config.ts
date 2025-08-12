// src/app/config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ErrorInterceptor } from './interceptors/error.interceptor'; // <-- Importa el interceptor
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar'; // <-- 1. IMPORTA EL MÓDULO
import { importProvidersFrom } from '@angular/core'; // <-- 2. IMPORTA ESTA FUNCIÓN

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()), // Habilita la inyección de dependencias
    importProvidersFrom(MatSnackBarModule),
    // Registra el interceptor de errores
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ]
};