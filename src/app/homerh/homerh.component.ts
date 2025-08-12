// homerh.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService, Usuario } from '../services/auth.service'; // Asumiendo que exportas la interfaz Usuario
import { ReportService } from '../services/report.service'; // Necesitarás crear este servicio

@Component({
  selector: 'app-homerh',
  standalone: true,
  imports: [
    CommonModule, RouterModule, DatePipe,
    MatSidenavModule, MatListModule, MatCardModule,
    MatIconModule, MatButtonModule, MatProgressSpinnerModule
  ],
  templateUrl: './homerh.component.html',
  styleUrls: ['./homerh.component.css']
})
export class HomerhComponent implements OnInit {
  fechaActual = new Date();
  usuarioActual: Usuario | null = null;

  // Variables para los KPIs
  estadoEnVivo: { presentes: number; retardos: number; ausentes: number; } | null = null;
  visitantesActivos: number | null = null;
  kpisSemana: { attendanceRate: string } | null = null;

  constructor(
    private authService: AuthService,
    private reportService: ReportService, // Inyecta el nuevo servicio de reportes
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.usuarioActual$.subscribe(user => this.usuarioActual = user);
    
    this.cargarDatosDashboard();
  }

  cargarDatosDashboard(): void {
    // 1. Cargar estado en vivo
    this.reportService.getLiveStatus().subscribe(respuesta => {
      const presentes = respuesta.data.filter((e:any) => e.status === 'ON_TIME').length;
      const retardos = respuesta.data.filter((e:any) => e.status === 'LATE').length;
      const ausentes = respuesta.data.filter((e:any) => e.status === 'ABSENT').length;
      this.estadoEnVivo = { presentes, retardos, ausentes };
    });

    // 2. Cargar visitantes activos (necesitarás un VisitorService)
    // this.visitorService.getVisitors({ status: 'IN_PROGRESS' }).subscribe(respuesta => {
    //   this.visitantesActivos = respuesta.data.length;
    // });
    this.visitantesActivos = 9; // Valor de ejemplo mientras creas el servicio

    // 3. Cargar KPIs de la semana
    this.reportService.getKpisSemanales().subscribe(respuesta => {
        this.kpisSemana = respuesta.data.kpis;
    });
  }

  cerrarSesion(): void {
    this.authService.cerrarSesion();
  }

  actualizarDatos(): void {
    // Lógica para navegar a la página de editar perfil
    this.router.navigate(['/perfil/editar']);
  }
  
  cambiarContrasena(): void {
     // Lógica para navegar a la página de cambiar contraseña
    this.router.navigate(['/perfil/cambiar-contrasena']);
  }
}