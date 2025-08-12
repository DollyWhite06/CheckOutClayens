import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs';

// Tus servicios y componentes
import { EmployeeService } from '../../services/employee.service';
import { CredentialService } from '../../services/credential.service'; // Necesitarás crear este servicio
import { NotificationService } from '../../services/notification.service';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { MatSidenavModule } from "@angular/material/sidenav";

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [
    CommonModule, RouterModule, DatePipe,
    MatTabsModule, MatCardModule, MatButtonModule, MatIconModule,
    MatProgressSpinnerModule, MatListModule, MatTooltipModule,
    MatSidenavModule
],
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  employee: any = null;
  credenciales: any = null; // Para almacenar tarjetas y huellas
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private credentialService: CredentialService, // Inyecta el nuevo servicio
    private notificationService: NotificationService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Leemos el parámetro 'code' de la URL y cargamos los datos
    this.route.paramMap.pipe(
      switchMap(params => {
        const employeeCode = params.get('code');
        if (!employeeCode) {
          this.router.navigate(['/empleadosrh']);
          return []; // Devolvemos un observable vacío para que no continúe
        }
        return this.employeeService.getEmployeeByCode(employeeCode); // Necesitarás este método en el servicio
      })
    ).subscribe(response => {
      this.employee = response.data;
      // Una vez que tenemos al empleado, cargamos sus credenciales
      this.cargarCredenciales();
      this.isLoading = false;
    });
  }

  cargarCredenciales(): void {
    if (!this.employee) return;
    
    // Necesitarás crear este endpoint en el backend
    this.credentialService.getCredentialsForEmployee(this.employee.employeeCode).subscribe(response => {
        this.credenciales = response.data;
    });
  }
  
  abrirFormularioEdicion(): void {
    // Lógica para abrir el diálogo de edición, similar a la del componente de lista
    const dialogRef = this.dialog.open(EmployeeFormComponent, {
      width: '600px',
      data: { employee: this.employee, departamentos: [] /* Deberías obtenerlos de un DepartmentService */ }
    });
    // ...
  }

  // --- MÉTODOS PARA GESTIONAR CREDENCIALES ---

  asignarRfid(): void {
    // Aquí abrirías un diálogo simple que pida el UID de la nueva tarjeta
    // y luego llame al servicio 'credentialService.assignRfid(...)'
    const cardUid = prompt('Introduce el UID de la nueva tarjeta RFID:');
    if (cardUid) {
      this.credentialService.assignRfid(this.employee.employeeCode, cardUid).subscribe(() => {
        this.notificationService.showSuccess('Tarjeta asignada correctamente.');
        this.cargarCredenciales(); // Refrescamos la lista
      });
    }
  }

  desasignarRfid(rfid: any): void {
    if (confirm(`¿Estás seguro de que quieres desasignar la tarjeta ${rfid.cardUid}?`)) {
      this.credentialService.unassignRfid(this.employee.employeeCode, rfid.cardUid).subscribe(() => {
        this.notificationService.showSuccess('Tarjeta desasignada.');
        this.cargarCredenciales();
      });
    }
  }

  registrarHuella(): void {
    // Esta es la acción más compleja.
    // Aquí abrirías un diálogo que guíe al administrador
    // y que inicie el flujo de WebSockets que ya hemos diseñado.
    this.notificationService.showError('Funcionalidad de registro de huella en construcción.');
    // Lógica:
    // 1. Abrir diálogo de "Registro de Huella"
    // 2. Pedirle que seleccione el dedo
    // 3. El diálogo llama al endpoint `POST /api/enroll/start`
    // 4. El diálogo se suscribe al WebSocket para recibir el progreso y el resultado.
  }

  eliminarHuella(fingerprint: any): void {
     if (confirm(`¿Estás seguro de que quieres eliminar la huella de ${fingerprint.fingerPosition}?`)) {
        this.credentialService.deleteFingerprint(this.employee.employeeCode, fingerprint.id).subscribe(() => {
            this.notificationService.showSuccess('Huella eliminada.');
            this.cargarCredenciales();
        });
     }
  }
}