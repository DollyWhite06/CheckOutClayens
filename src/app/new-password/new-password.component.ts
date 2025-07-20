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
  selector: 'app-new-password',
  imports: [MatSlideToggle, MatToolbarModule, MatButtonToggleModule, MatCardModule,
    MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule, MatDividerModule, MatButtonModule],
      templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.css'
})
export class NewPasswordComponent {
hide = true;
  newpass = new FormControl('', [Validators.required, Validators.minLength(9)]);
  actpass = new FormControl('',[Validators.required, Validators.minLength(20)] )
 
  getErrorMessagenewpass() {
   if (this.newpass.hasError('required')) {
    return 'Ingresa tu contraseña nueva';
   }
 
  return this.newpass.hasError('newpass') ? 'Contraseña invalido' : '';
  }
  getErrorMessageactpass() {
  if (this.actpass.hasError('required')) {
    return 'Ingresa tu contraseña actual';
  }
 
  return this.actpass.hasError('actpass') ? 'Contraseña invalida' : '';
  }
}
