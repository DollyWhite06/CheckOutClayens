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
  selector: 'app-register',
  imports: [MatSlideToggle, MatToolbarModule, MatButtonToggleModule, MatCardModule,
    MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule, MatDividerModule, MatButtonModule],
  
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
hide = true;
 email = new FormControl('', [Validators.required, Validators.email]);  
 password = new FormControl('', [Validators.required, Validators.minLength(9)]);
 name = new FormControl('',[Validators.required, Validators.minLength(20)] )
 apaterno = new FormControl('',[Validators.required, Validators.minLength(20)] )
 amaterno = new FormControl('',[Validators.required, Validators.minLength(20)] )
 numtelefonico = new FormControl('',[Validators.required, Validators.minLength(8)] )


 getErrorMessageEmail() {
 if (this.email.hasError('required')) {
 return 'Ingresa tu email';
 }

 return this.email.hasError('email') ? 'Email invalido' : '';
 }
 
 getErrorMessagename() {
  if (this.name.hasError('required')) {
   return 'Ingresa tu nombre';
  }

 return this.name.hasError('name') ? 'Nombre invalido' : '';
 }

  getErrorMessageapaterno() {
  if (this.apaterno.hasError('required')) {
   return 'Ingresa tu Apellido paterno';
  }

 return this.name.hasError('apaterno') ? 'Apellido paterno invalido' : '';
 }

  getErrorMessageamaterno() {
  if (this.name.hasError('required')) {
   return 'Ingresa tu apellido materno';
  }

 return this.name.hasError('amaterno') ? 'Apellido materno invalido' : '';
 }

 getErrorMessagePassword() {
 if (this.password.hasError('required')) {
 return 'Ingresa tu contraseña';
 }

 return this.password.hasError('password') ? 'Contraseña invalida' : '';
 }
 
  getErrorMessageNumtelefonico() {
 if (this.numtelefonico.hasError('required')) {
 return 'Ingresa tu numero telefonico';
 }

 return this.numtelefonico.hasError('numero telefonico') ? 'Numero telefonico invalida' : '';
 }
}
