import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';



@Component({
  selector: 'app-login',
  imports: [MatSlideToggle, MatToolbarModule, MatButtonToggleModule, MatCardModule,
    MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule, MatDividerModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
hide = true;
 email = new FormControl('', [Validators.required, Validators.email]);  
 password = new FormControl('', [Validators.required, Validators.minLength(9)]);

 getErrorMessageEmail() {
 if (this.email.hasError('required')) {
 return 'Ingresa tu email';
 }

 return this.email.hasError('email') ? 'Email invalido' : '';
 }
 
 getErrorMessagePassword() {
 if (this.password.hasError('required')) {
 return 'Ingresa tu contraseña';
 }

 return this.password.hasError('password') ? 'Contraseña invalida' : '';
 }
}
