import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-registrocaseta',
  imports: [ MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './registrocaseta.component.html',
  styleUrl: './registrocaseta.component.css'
})
export class RegistrocasetaComponent {
hide = true;

nombre = new FormControl('', [
  Validators.pattern('^[a-zA-Z ]*$')
]);




limpiarnom() {
  this.nombre.reset();
}


 getErrorMessageNombre() {
  if (this.nombre.hasError('pattern')) {
 return 'Inserte letras';
 }

 return this.nombre.hasError('nombre ') ? 'Nombre  invalido' : '';
 }
}
