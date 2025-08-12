import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

// Imports para el formulario y Angular Material
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, MatToolbarModule,
    MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule,
    MatIconModule, MatDividerModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  cargando = false;
  // mensajeError: string | null = null; // <-- ELIMINAMOS ESTA LÍNEA

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  getErrorMessageEmail() {
    if (this.email.hasError('required')) return 'Ingresa tu email';
    return this.email.hasError('email') ? 'Email inválido' : '';
  }
 
  getErrorMessagePassword() {
    if (this.password.hasError('required')) return 'Ingresa tu contraseña';
    return '';
  }

   iniciarSesion(): void {
    if (this.email.invalid || this.password.invalid) return;
    this.cargando = true;

    const credenciales = {
      email: this.email.value,
      password: this.password.value
    };

    this.authService.iniciarSesion(credenciales).subscribe({
      // --- LÓGICA SIMPLIFICADA ---
      next: () => {
        // No necesitamos hacer nada aquí. El AuthService ya redirigió al usuario.
        // El 'complete' se encargará de detener el spinner de carga.
      },
      error: () => {
        // El ErrorInterceptor ya mostró el popup de error.
        this.cargando = false;
      },
      complete: () => {
        this.cargando = false;
      }
    });
  }
}