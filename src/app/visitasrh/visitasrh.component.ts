import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';


@Component({
  selector: 'app-visitasrh',
  imports: [ MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './visitasrh.component.html',
  styleUrl: './visitasrh.component.css'
})
export class VisitasrhComponent {

hide = true;
nombre = new FormControl('', [
  Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$')
]);

empresa = new FormControl('', [
  Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$')
]);



limpiar() {
  this.nombre.reset();
}

 getErrorMessageNombre() {
 if (this.nombre.hasError('pattern')) {
 return 'Inserte letras';
 }

 return this.nombre.hasError('Nombre') ? 'Nombre invalido' : '';
 }
 getErrorMessageEmpresa() {
 if (this.nombre.hasError('pattern')) {
 return 'Inserte letras';
 }

 return this.nombre.hasError('Nombre') ? 'Empresa invalido' : '';
 }
}


