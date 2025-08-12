import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from '../components/custom-snackbar/custom-snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  showError(title: string, subtitle: string = '', duration: number = 6000): void {
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      duration: duration,
      data: { title, subtitle, isError: true },
      panelClass: ['snackbar-error'],
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  showSuccess(title: string, subtitle: string = '', duration: number = 3000): void {
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      duration: duration,
      data: { title, subtitle, isError: false },
      panelClass: ['snackbar-success'],
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}