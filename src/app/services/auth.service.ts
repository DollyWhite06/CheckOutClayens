// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';
import { Observable, BehaviorSubject, tap, map, catchError, of } from 'rxjs';
import { Router } from '@angular/router';

// Exportamos la interfaz para que otros componentes puedan usarla y tener un tipado fuerte.
export interface Usuario {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string | number | null;
  role: {
    id: number;
    name: string;
    description: string;
  };
  isActive: boolean;
  lastLogin: string | null;
}

// Mapa que centraliza la lógica de redirección post-login.
const ROL_RUTA_MAPA: { [key: string]: string } = {
  ADMIN: '/homerh',
  HR: '/homerh',
  CASETA: '/homecaseta',
  GERENCIA: '/homerh',
  DEFAULT: '/home' // Ruta de respaldo si un rol no está en el mapa.
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Construye la URL base para las peticiones de autenticación.
  private urlApi = `${environment.apiUrl}`;

  // BehaviorSubject para almacenar los datos completos del usuario actual.
  // Es la "única fuente de verdad" sobre el usuario logueado.
  private usuarioActualSubject = new BehaviorSubject<Usuario | null>(null);
  public usuarioActual$ = this.usuarioActualSubject.asObservable();

  // Estado para saber si ya se completó la carga inicial del usuario
  private cargaInicialCompletada = new BehaviorSubject<boolean>(false);
  public cargaInicialCompletada$ = this.cargaInicialCompletada.asObservable();

  // Observable derivado para un simple chequeo booleano (true/false).
  public estaAutenticado$: Observable<boolean>;

  constructor(private http: HttpClient, private router: Router) {
    // Derivamos el estado de autenticación de si el objeto 'usuario' tiene un ID.
    this.estaAutenticado$ = this.usuarioActual$.pipe(map(usuario => !!usuario && !!usuario.id));
    
    // Al iniciar el servicio, intentamos mantener la sesión del usuario si ya tenía un token.
    // Usamos setTimeout para asegurar que se ejecute después de que el servicio esté completamente inicializado
    setTimeout(() => this.cargarUsuarioDesdeToken(), 0);
  }

  /**
   * Se ejecuta al iniciar el servicio. Si existe un token, intenta obtener los datos del
   * usuario para mantener la sesión activa entre recargas de página.
   */
  private cargarUsuarioDesdeToken(): void {
    const token = this.obtenerTokenAcceso();
    console.log('🔍 Verificando token:', !!token);
    
    if (!token) {
      console.log('❌ No hay token, marcando carga como completada');
      // Si no hay token, marcamos la carga como completada inmediatamente
      this.cargaInicialCompletada.next(true);
      return;
    }

    console.log('🚀 Haciendo petición a /me para verificar token...');
    this.http.get<{ data: Usuario }>(`${this.urlApi}/me`).pipe(
      catchError((error) => {
        console.error('❌ Error al verificar token:', error);
        // Si el token es inválido, lo limpiamos pero NO cerramos sesión aquí para evitar bucles
        this.limpiarTokens();
        this.cargaInicialCompletada.next(true);
        return of(null);
      })
    ).subscribe(respuesta => {
      console.log('✅ Respuesta de /me:', respuesta);
      if (respuesta && respuesta.data) {
        console.log('👤 Usuario cargado:', respuesta.data.username, 'Rol:', respuesta.data.role.name);
        // Si la llamada es exitosa, emitimos el objeto de usuario.
        this.usuarioActualSubject.next(respuesta.data);
      }
      // IMPORTANTE: Siempre marcamos la carga como completada, haya sido exitosa o no
      console.log('✅ Carga inicial completada');
      this.cargaInicialCompletada.next(true);
    });
  }

  /**
   * Envía las credenciales al backend y maneja la redirección post-login.
   */
  iniciarSesion(credenciales: any): Observable<any> {
    return this.http.post<any>(`${this.urlApi}/login`, credenciales).pipe(
      tap(respuesta => {
        this.guardarSesion(respuesta.data);
        this.usuarioActualSubject.next(respuesta.data.user);
        
        const rolUsuario = respuesta.data.user.role.name;
        this.redirigirPorRol(rolUsuario);
      })
    );
  }

  /**
   * Redirige al usuario a su dashboard correspondiente basado en su rol.
   */
  public redirigirPorRol(rol: string): void {
    const rutaDestino = ROL_RUTA_MAPA[rol] || ROL_RUTA_MAPA['DEFAULT'];
    this.router.navigate([rutaDestino]);
  }

  /**
   * Cierra la sesión del usuario.
   */
  cerrarSesion(): void {
    this.limpiarTokens();
    this.usuarioActualSubject.next(null);
    this.router.navigate(['/login']);
  }

  /**
   * Limpia los tokens del localStorage sin hacer redirecciones
   */
  private limpiarTokens(): void {
    localStorage.removeItem('token_acceso');
    localStorage.removeItem('token_refresco');
  }

  /**
   * Registra un nuevo usuario.
   */
  public registrar(datosUsuario: any): Observable<any> {
    return this.http.post<any>(`${this.urlApi}/register`, datosUsuario);
  }

  /**
   * Intenta refrescar el token de acceso usando el refresh token.
   */
  public refreshToken(): Observable<any> {
    const refreshToken = this.obtenerRefreshToken();
    if (!refreshToken) {
      this.cerrarSesion();
      return new Observable(observer => observer.error('No refresh token available'));
    }
    return this.http.post<any>(`${this.urlApi}/refresh-token`, { refreshToken }).pipe(
      tap((respuesta) => {
        this.guardarSesion(respuesta.data);
        this.usuarioActualSubject.next(respuesta.data.user);
      })
    );
  }
  
  /**
   * Guarda los tokens recibidos de la API en el localStorage.
   */
  public guardarSesion(datos: { user: Usuario; token?: any; accessToken?: any; refreshToken: any }): void {
    const accessToken = datos.token || datos.accessToken;
    if (accessToken?.token && datos.refreshToken?.token) {
        localStorage.setItem('token_acceso', accessToken.token);
        localStorage.setItem('token_refresco', datos.refreshToken.token);
    }
  }

  public obtenerTokenAcceso(): string | null {
    return localStorage.getItem('token_acceso');
  }

  public obtenerRefreshToken(): string | null {
    return localStorage.getItem('token_refresco');
  }

  private tieneToken(): boolean {
    return !!localStorage.getItem('token_acceso');
  }
}