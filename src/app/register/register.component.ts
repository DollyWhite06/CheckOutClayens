import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

// Imports de Angular, Forms y Material
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule, MatToolbarModule, MatCardModule,
    MatFormFieldModule, MatInputModule, MatIconModule, MatDividerModule, MatButtonModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  hide = true;
  formularioRegistro: FormGroup;
  cargando = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.formularioRegistro = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      apaterno: new FormControl('', [Validators.required, Validators.minLength(2)]),
      amaterno: new FormControl('', [Validators.required, Validators.minLength(2)]),
      numtelefonico: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]), // Validamos 10 dígitos numéricos
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      password_confirmation: new FormControl('', [Validators.required])
    }, { validators: this.passwordsMatchValidator });
  }

  passwordsMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('password_confirmation');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordsMismatch: true });
      return { passwordsMismatch: true };
    }
    return null;
  };
  
  // Getters para acceso fácil desde el template
  get name() { return this.formularioRegistro.get('name')!; }
  get apaterno() { return this.formularioRegistro.get('apaterno')!; }
  get amaterno() { return this.formularioRegistro.get('amaterno')!; }
  get numtelefonico() { return this.formularioRegistro.get('numtelefonico')!; }
  get email() { return this.formularioRegistro.get('email')!; }
  get username() { return this.formularioRegistro.get('username')!; }
  get password() { return this.formularioRegistro.get('password')!; }
  get password_confirmation() { return this.formularioRegistro.get('password_confirmation')!; }

  // Se ejecuta al enviar el formulario
  crearCuenta(): void {
  if (this.formularioRegistro.invalid) {
    this.formularioRegistro.markAllAsTouched();
    return;
  }
  this.cargando = true;

    // Construimos el objeto que espera la API
    const datosParaApi = {
      firstName: this.name.value,
      lastName: `${this.apaterno.value} ${this.amaterno.value}`,
      username: this.username.value,
      email: this.email.value,
      phone: this.numtelefonico.value, // <-- CAMPO AÑADIDO
      password: this.password.value,
      password_confirmation: this.password_confirmation.value
    };

    this.authService.registrar(datosParaApi).subscribe({
    next: (respuesta) => {
      // Usamos el NotificationService para el éxito
      this.notificationService.showSuccess(respuesta.message);
      setTimeout(() => { this.router.navigate(['/login']); }, 2000);
    },
    error: () => {
      // El interceptor ya mostró el popup. Solo detenemos la carga.
      this.cargando = false;
    },
    complete: () => {
      this.cargando = false;
    }
  });
}
  // Método para navegar al login
  irALogin(): void {
    this.router.navigate(['/login']);
  }
}