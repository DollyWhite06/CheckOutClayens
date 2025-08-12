// src/app/guards/auth.guard.ts
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService, Usuario } from '../services/auth.service';
import { map, filter, take } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { NotificationService } from '../services/notification.service';

/**
 * Guardián de rutas asíncrono y robusto.
 * Espera a que la carga inicial del usuario se complete antes de tomar una decisión.
 * Esto es crucial para manejar correctamente las recargas de página.
 */
export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const notificationService = inject(NotificationService);

  console.log('🛡️ AuthGuard ejecutándose para ruta:', route.url.map(u => u.path).join('/'));

  // Esperamos tanto al usuario como a que se complete la carga inicial
  return combineLatest([
    authService.usuarioActual$,
    authService.cargaInicialCompletada$
  ]).pipe(
    // Solo procedemos cuando la carga inicial esté completada
    filter(([usuario, cargaCompletada]) => {
      console.log('🔄 Guard - Usuario:', !!usuario?.id, 'Carga completada:', cargaCompletada);
      return cargaCompletada;
    }),
    
    // Tomamos el primer valor una vez que la carga esté completada
    take(1),
    
    // Mapeamos a la decisión de autorización
    map(([usuario, cargaCompletada]) => {
      console.log('🎯 Guard - Evaluando acceso...');
      
      // Verificamos si es un objeto de usuario válido con un ID.
      if (usuario && usuario.id) {
        console.log('👤 Usuario válido encontrado:', usuario.username, 'Rol:', usuario.role.name);
        
        // Si hay un usuario válido, procedemos a verificar los roles.
        const rolesPermitidos = route.data['roles'] as Array<string>;
        console.log('🔑 Roles requeridos:', rolesPermitidos);

        // Si la ruta no especifica roles, con estar logueado es suficiente.
        if (!rolesPermitidos || rolesPermitidos.length === 0) {
          console.log('✅ Acceso concedido - No se requieren roles específicos');
          return true;
        }

        // Si se especifican roles, verificamos el permiso.
        const tienePermiso = rolesPermitidos.includes(usuario.role.name);
        if (tienePermiso) {
          console.log('✅ Acceso concedido - Rol válido');
          return true; // Acceso concedido.
        } else {
          // No tiene el rol correcto.
          console.log('❌ Acceso denegado - Rol insuficiente');
          notificationService.showError('No tienes los permisos necesarios para acceder a esta página.');
          authService.redirigirPorRol(usuario.role.name); // Lo enviamos a su página de inicio.
          return false;
        }
      }
      
      // Si después de completar la carga inicial, el usuario sigue sin ser válido,
      // significa que no hay sesión activa, redirigimos al login.
      console.log('❌ No hay usuario válido después de la carga inicial, redirigiendo a login');
      router.navigate(['/login']);
      return false;
    })
  );
};