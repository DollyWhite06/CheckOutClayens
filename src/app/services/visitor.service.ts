import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class VisitorService {
  private urlApi = `${environment.apiUrl}/visitors`;

  constructor(private http: HttpClient) { }

  /**
   * Obtiene una lista de visitantes, con la opción de filtrar por estado.
   * @param filters - Un objeto con los filtros a aplicar. Ej: { status: 'IN_PROGRESS' }
   */
  getVisitors(filters: { status?: 'IN_PROGRESS' | 'COMPLETED' }): Observable<any> {
    let params = new HttpParams();
    if (filters.status) {
      params = params.set('status', filters.status);
    }
    // Aquí podrías añadir más filtros para la paginación si lo necesitas
    // params = params.set('page', 1);
    
    return this.http.get<any>(this.urlApi, { params });
  }
}