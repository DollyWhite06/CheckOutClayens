import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';


@Component({
  selector: 'app-asistenciasrh',
  imports: [ MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './asistenciasrh.component.html',
  styleUrl: './asistenciasrh.component.css'
})
export class AsistenciasrhComponent {
hide = true;
numempleado = new FormControl('', [
  Validators.minLength(8),
  Validators.maxLength(8),
   Validators.pattern('^[0-9]*$')
]);

nombre = new FormControl('', [
  Validators.pattern('^[a-zA-Z ]*$')
]);


limpiarnum() {
  this.numempleado.reset();
}

limpiarnom() {
  this.nombre.reset();
}

 getErrorMessageNum() {
 if (this.numempleado.hasError('minlength')) {
 return 'Minimo 8 digitos';
 }

 else if (this.numempleado.hasError('maxlength')) {
 return 'Maximo 8 digitos';
 }
else if (this.numempleado.hasError('pattern')) {
 return 'Inserte numeros';
 }

 return this.numempleado.hasError('numero empleado') ? 'Numero de empleado invalido' : '';
 }

 getErrorMessageNombre() {
  if (this.nombre.hasError('pattern')) {
 return 'Inserte letras';
 }

 return this.nombre.hasError('nombre empleado') ? 'Nombre de empleado invalido' : '';
 }

}
