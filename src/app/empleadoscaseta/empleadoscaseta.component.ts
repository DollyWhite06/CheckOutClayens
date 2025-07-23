import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';


@Component({
  selector: 'app-empleadoscaseta',
  imports: [ MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './empleadoscaseta.component.html',
  styleUrl: './empleadoscaseta.component.css'
})
export class EmpleadoscasetaComponent {

hide = true;
numempleado = new FormControl('', [
  Validators.minLength(8),
  Validators.maxLength(8),
   Validators.pattern('^[0-9]*$')
]);


limpiar() {
  this.numempleado.reset();
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
}
