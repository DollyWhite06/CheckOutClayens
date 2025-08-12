import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';

export interface Employee {
  id: number;
  employeeCode: string;
  nombre: string;
  paterno: string;
  materno?: string;
  email?: string;
  departmentId: number;
  // ... y cualquier otra propiedad que uses en el frontend
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = `${environment.apiUrl}/employees`;

  constructor(private http: HttpClient) { }

  /**
   * Obtiene una lista paginada y filtrada de empleados.
   * @param filters - Objeto con los filtros (búsqueda, paginación, etc.).
   */
  getEmployees(filters: any): Observable<any> {
    let params = new HttpParams()
      .set('page', filters.page.toString())
      .set('per_page', filters.per_page.toString());

    if (filters.search) {
      params = params.set('search', filters.search);
    }
    if (filters.departmentId) {
      params = params.set('departmentId', filters.departmentId.toString());
    }
    if (filters.isActive !== null && filters.isActive !== undefined) {
      params = params.set('is_active', filters.isActive.toString());
    }
    // Para el ordenamiento
    // if (filters.sort && filters.order) {
    //   params = params.set('sort', filters.sort).set('order', filters.order);
    // }

    return this.http.get<any>(this.apiUrl, { params });
  }

  /**
   * Crea un nuevo empleado.
   * @param employeeData - Los datos del nuevo empleado.
   */
  createEmployee(employeeData: Partial<Employee>): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employeeData);
  }

  /**
   * Actualiza un empleado existente.
   * @param employeeCode - El código del empleado a actualizar.
   * @param employeeData - Los nuevos datos del empleado.
   */
  updateEmployee(employeeCode: string, employeeData: Partial<Employee>): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${employeeCode}`, employeeData);
  }

  /**
   * Desactiva un empleado.
   * @param employeeCode - El código del empleado.
   */
  deactivateEmployee(employeeCode: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${employeeCode}/deactivate`, {});
  }
  
  /**
   * Activa un empleado.
   * @param employeeCode - El código del empleado.
   */
  activateEmployee(employeeCode: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${employeeCode}/activate`, {});
  }

  // --- MÉTODO NUEVO AÑADIDO ---

  /**
   * Obtiene los datos de un único empleado por su código.
   * @param employeeCode - El código del empleado a buscar.
   */
  getEmployeeByCode(employeeCode: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${employeeCode}`);
  }
}