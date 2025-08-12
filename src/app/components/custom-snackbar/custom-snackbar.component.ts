import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-snackbar',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  template: `
    <div class="snackbar-content">
      <mat-icon class="snackbar-icon">{{ data.isError ? 'error_outline' : 'check_circle_outline' }}</mat-icon>
      <div class="message-container">
        <span class="snackbar-title">{{ data.title }}</span>
        <span class="snackbar-subtitle">{{ data.subtitle }}</span>
      </div>
      <button mat-icon-button (click)="snackBarRef.dismiss()">
        <mat-icon>close</mat-icon>
      </button>
    </div>
  `,
  styleUrls: ['./custom-snackbar.component.css']
})
export class CustomSnackbarComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<CustomSnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: { title: string; subtitle: string; isError: boolean }
  ) {}
}