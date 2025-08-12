import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';

// Opcional: Definir interfaces para los datos
export interface RfidAssignment {
  id: number;
  cardUid: string;
  assignedDate: string;
  // ... y otras propiedades que devuelve la API
}

export interface Fingerprint {
  id: number;
  fingerPosition: string;
  createdAt: string;
  // ... y otras propiedades
}

export interface EmployeeCredentials {
  rfidCards: RfidAssignment[];
  fingerprints: Fingerprint[];
}

@Injectable({
  providedIn: 'root'
})
export class CredentialService {
  // La ruta base para las credenciales estará anidada bajo los empleados
  private employeeApiUrl = `${environment.apiUrl}/employees`;

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todas las credenciales (tarjetas y huellas) de un empleado específico.
   * @param employeeCode - El código del empleado.
   */
  getCredentialsForEmployee(employeeCode: string): Observable<{ data: EmployeeCredentials }> {
    // Este endpoint es una sugerencia. Si ya precargas esto en GET /employees/:code, puedes reutilizarlo.
    // Pero tener un endpoint dedicado es más limpio.
    return this.http.get<{ data: EmployeeCredentials }>(`${this.employeeApiUrl}/${employeeCode}/credentials`);
  }

  /**
   * Asigna una tarjeta RFID a un empleado.
   * @param employeeCode - El código del empleado.
   * @param cardUid - El UID de la tarjeta a asignar.
   */
  assignRfid(employeeCode: string, cardUid: string): Observable<any> {
    return this.http.post<any>(`${this.employeeApiUrl}/${employeeCode}/assign-rfid`, { cardUid });
  }

  /**
   * Desasigna una tarjeta RFID de un empleado.
   * @param employeeCode - El código del empleado.
   * @param cardUid - El UID de la tarjeta a desasignar.
   */
  unassignRfid(employeeCode: string, cardUid: string): Observable<any> {
    return this.http.post<any>(`${this.employeeApiUrl}/${employeeCode}/unassign-rfid`, { cardUid });
  }

  /**
   * Elimina una huella dactilar registrada de un empleado.
   * @param employeeCode - El código del empleado.
   * @param fingerprintId - El ID de la huella a eliminar.
   */
  deleteFingerprint(employeeCode: string, fingerprintId: number): Observable<any> {
    return this.http.delete<any>(`${this.employeeApiUrl}/${employeeCode}/fingerprints/${fingerprintId}`);
  }
  
  // No incluimos 'registerFingerprint' aquí porque ese flujo es diferente.
  // Es iniciado por el EnrollmentController y manejado por WebSockets,
  // por lo que no es una llamada de servicio HTTP directa de este tipo.
}