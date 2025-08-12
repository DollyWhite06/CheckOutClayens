// src/app/components/empleadosrh/empleadosrh.component.ts
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, switchMap, startWith } from 'rxjs/operators';
import { Subject, merge } from 'rxjs'; // <-- Importa Subject
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

// Imports de Material y Servicios
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';

import { EmployeeService } from '../services/employee.service';
import { DepartmentService } from '../services/department.service';
import { NotificationService } from '../services/notification.service';
import { AuthService, Usuario } from '../services/auth.service';
import { EmployeeFormComponent } from '../components/employee-form/employee-form.component';


@Component({
  selector: 'app-empleadosrh',
  standalone: true, // <-- Añadido para que los imports funcionen
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule, MatSidenavModule, MatListModule,
    MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTableModule,
    MatPaginatorModule, MatSortModule, MatIconModule, MatButtonModule, MatTooltipModule,
    MatProgressSpinnerModule, MatDialogModule, EmployeeFormComponent
  ],
  templateUrl: './empleadosrh.component.html',
  styleUrls: ['./empleadosrh.component.css'],
})
export class EmpleadosrhComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['employeeCode', 'nombreCompleto', 'departamento', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<any>();
  isLoading = true;
  usuarioActual: Usuario | null = null;
  
  filterForm: FormGroup;
  departamentos: any[] = [];

  // --- INICIO DE LA CORRECCIÓN #2: Disparador de Refresco ---
  // Creamos un Subject que actuará como un botón "invisible" para recargar los datos.
  private refreshTrigger = new Subject<void>();
  // --- FIN DE LA CORRECCIÓN ---

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private authService: AuthService,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private notificationService: NotificationService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.filterForm = this.fb.group({
      search: [''],
      departmentId: [null],
      isActive: [null]
    });
  }

  ngOnInit(): void {
    this.departmentService.getDepartments().subscribe(deptos => this.departamentos = deptos);
    this.authService.usuarioActual$.subscribe(user => this.usuarioActual = user);
  }
  
  ngAfterViewInit(): void {
    // Escucha los eventos de ordenamiento, paginación, cambios en filtros Y nuestro disparador de refresco.
    merge(this.sort.sortChange, this.paginator.page, this.filterForm.valueChanges.pipe(debounceTime(400)), this.refreshTrigger.asObservable())
      .pipe(
        startWith({}), // Dispara la carga inicial
        switchMap(() => {
          this.isLoading = true;
          const filters = {
            ...this.filterForm.value,
            page: this.paginator.pageIndex + 1,
            per_page: this.paginator.pageSize,
            sort: this.sort.active,
            order: this.sort.direction
          };
          return this.employeeService.getEmployees(filters);
        })
      )
      .subscribe(response => {
        this.isLoading = false;
        this.dataSource.data = response.data.data;
        this.paginator.length = response.data.meta.total;
      });
  }

  abrirFormulario(employeeData: any = null): void {
    const dialogRef = this.dialog.open(EmployeeFormComponent, {
      width: '600px',
      data: {
        employee: employeeData,
        departamentos: this.departamentos
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // Si el diálogo se cerró con éxito (devolviendo 'true')...
      if (result === true) {
        // ...disparamos nuestro Subject para forzar la recarga de la tabla.
        this.refreshTrigger.next();
      }
    });
  }

  cambiarEstado(employee: any): void {
    this.isLoading = true;

    const action = employee.isActive 
      ? this.employeeService.deactivateEmployee(employee.employeeCode)
      : this.employeeService.activateEmployee(employee.employeeCode);

    const message = employee.isActive ? `Empleado desactivado.` : `Empleado activado.`;

    action.subscribe({
      next: () => {
        this.notificationService.showSuccess(message);
        // Usamos también nuestro disparador para recargar la tabla.
        this.refreshTrigger.next();
      },
      error: () => this.isLoading = false,
    });
  }

  gestionarCredenciales(employee: any): void {
    this.router.navigate(['/empleadosrh/detalle', employee.employeeCode]);
  }

  cerrarSesion(): void {
    this.authService.cerrarSesion();
  }

  actualizarDatos(): void {
    this.router.navigate(['/perfil/editar']);
  }
  
  cambiarContrasena(): void {
    this.router.navigate(['/perfil/cambiar-contrasena']);
  }
}