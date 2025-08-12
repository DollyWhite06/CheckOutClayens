import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../enviroments/enviroment';

export interface Department {
  id: number;
  name: string;
  // Añade otras propiedades si las necesitas
}

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private apiUrl = `${environment.apiUrl}/departments`; // Asumiendo que tienes un endpoint para listar departamentos

  constructor(private http: HttpClient) { }

  /**
   * Obtiene una lista de todos los departamentos.
   * Asume que la API devuelve un objeto con una propiedad 'data'.
   */
  getDepartments(): Observable<Department[]> {
    // Necesitarás crear este endpoint en tu backend si no lo tienes.
    // Debería devolver todos los departamentos sin paginación para los dropdowns.
    return this.http.get<{ data: Department[] }>(this.apiUrl).pipe(
      map(response => response.data)
    );
  }
}