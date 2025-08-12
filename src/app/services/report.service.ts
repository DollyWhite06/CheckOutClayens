import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';
import { DateTime } from 'luxon'; // Necesitarás instalar Luxon en tu proyecto de Angular

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private urlApi = `${environment.apiUrl}/reports`;

  constructor(private http: HttpClient) { }

  /**
   * Obtiene el estado en vivo de todos los empleados activos para el día de hoy.
   */
  getLiveStatus(): Observable<any> {
    return this.http.get<any>(`${this.urlApi}/live-status`);
  }

  /**
   * Obtiene los KPIs de asistencia para los últimos 7 días.
   */
  getKpisSemanales(): Observable<any> {
    // Calculamos las fechas para los últimos 7 días
    const endDate = DateTime.now().toISODate();
    const startDate = DateTime.now().minus({ days: 7 }).toISODate();

    const body = {
      startDate,
      endDate
    };
    
    return this.http.post<any>(`${this.urlApi}/kpis`, body);
  }
}