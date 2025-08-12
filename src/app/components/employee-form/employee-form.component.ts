import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '../../services/employee.service';
import { NotificationService } from '../../services/notification.service';
import { Department } from '../../services/department.service';
import { DateTime } from 'luxon';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';
// --- IMPORTS DE ANGULAR MATERIAL NECESARIOS ---
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; // Necesario para el Datepicker
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    // Módulos de Angular Material
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule, // <-- MUY IMPORTANTE para el Datepicker
    MatButtonModule,
    MatIconModule,
  ]
  
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  isEditMode: boolean;
  isSaving = false;
  departamentos: Department[];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EmployeeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { employee: any; departamentos: Department[] },
    private employeeService: EmployeeService,
    private notificationService: NotificationService
  ) {
    // Determinamos si es un formulario de edición o de creación
    this.isEditMode = !!this.data.employee;
    this.departamentos = this.data.departamentos;

    // Inicializamos el formulario con validadores
    this.employeeForm = this.fb.group({
      employeeCode: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      paterno: ['', [Validators.required, Validators.minLength(2)]],
      materno: [''],
      email: ['', [Validators.email]],
      departmentId: [null, [Validators.required]],
      position: [''],
      // Luxon es inmutable, por eso usamos 'fromISO' para la fecha
      hireDate: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.isEditMode) {
      // Si estamos editando, poblamos el formulario con los datos del empleado
      const employeeData = {
        ...this.data.employee,
        // El datepicker de Material necesita un objeto Date o Luxon.
        hireDate: DateTime.fromISO(this.data.employee.hireDate).toJSDate()
      }
      this.employeeForm.patchValue(employeeData);

      // Deshabilitamos el campo de código de empleado en modo edición
      this.employeeForm.get('employeeCode')?.disable();
    }
  }

  /**
   * Se ejecuta al hacer clic en el botón de Guardar.
   */
  onSave(): void {
    if (this.employeeForm.invalid) {
      return;
    }

    this.isSaving = true;
    const formData = this.employeeForm.getRawValue(); // Usamos getRawValue para incluir campos deshabilitados
    
    // Formateamos la fecha a YYYY-MM-DD para la API
    formData.hireDate = DateTime.fromJSDate(formData.hireDate).toISODate();

    if (this.isEditMode) {
      // Lógica para ACTUALIZAR
      this.employeeService.updateEmployee(this.data.employee.employeeCode, formData).subscribe({
        next: () => {
          this.notificationService.showSuccess('Empleado actualizado exitosamente.');
          this.dialogRef.close(true); // Cerramos el diálogo y enviamos 'true' para indicar éxito
        },
        error: () => this.isSaving = false, // El interceptor muestra el error, solo detenemos la carga
      });
    } else {
      // Lógica para CREAR
      this.employeeService.createEmployee(formData).subscribe({
        next: () => {
          this.notificationService.showSuccess('Empleado creado exitosamente.');
          this.dialogRef.close(true);
        },
        error: () => this.isSaving = false,
      });
    }
  }

  /**
   * Se ejecuta al hacer clic en el botón de Cancelar.
   */
  onNoClick(): void {
    this.dialogRef.close();
  }
}