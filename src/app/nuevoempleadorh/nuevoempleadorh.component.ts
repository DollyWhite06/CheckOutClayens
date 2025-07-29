import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { DatosbiometricosComponent } from '../datosbiometricos/datosbiometricos.component';


@Component({
  selector: 'app-nuevoempleadorh',
  imports: [
     MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    
    MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule,MatCardModule],
  templateUrl: './nuevoempleadorh.component.html',
  styleUrl: './nuevoempleadorh.component.css'
})
export class NuevoempleadorhComponent {
hide = true;



nombre = new FormControl('', [Validators.required,  Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')])
apaterno = new FormControl('', [Validators.required,  Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')])
amaterno = new FormControl('', [Validators.required,  Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')])
tarjeta = new FormControl('', [Validators.required,Validators.minLength(10),Validators.maxLength(10), Validators.pattern('^[0-9]*$')]);
num = new FormControl('', [Validators.required, Validators.minLength(10),Validators.maxLength(10), Validators.pattern('^[0-9]*$')]);
//fecha = new FormControl('', [Validators.minLength(8),Validators.maxLength(8), Validators.pattern('^[0-9]*$')]);
 email = new FormControl('', [Validators.required, Validators.email]);  
departamento = new FormControl('', Validators.required);
rol = new FormControl('', Validators.required);
fecha = new FormControl('', Validators.required);

constructor(public dialog: MatDialog) {}
abrirModal() {
  const dialogRef = this.dialog.open(DatosbiometricosComponent, {
    width: '400px'
  });

  dialogRef.afterClosed().subscribe(resultado => {
    if (resultado) {
      console.log('Visita guardado:', resultado);
    }
  });
}


getErrorMessageEmail() {
 if (this.email.hasError('required')) {
 return 'Ingresa email';
 }

 return this.email.hasError('email') ? 'Email invalido' : '';
 }
getErrorMessageNombre() {
 if (this.nombre.hasError('required')) {
 return 'Escriba el nomnbre del nuevo empleador';
 }

else if (this.nombre.hasError('pattern')) {
 return 'Inserte letras';
 }

 return this.nombre.hasError('nombre invalido') ? 'Nombre invalido' : '';
}

getErrorMessageapaterno() {
 if (this.apaterno.hasError('required')) {
 return 'Escriba el apellido paterno del nuevo empleador';
 }

else if (this.apaterno.hasError('pattern')) {
 return 'Inserte letras';
 }

 return this.apaterno.hasError('apellido paterno invalido') ? 'Apellido invalido' : '';
}
getErrorMessageamaterno() {
 if (this.amaterno.hasError('required')) {
 return 'Escriba el apellido materno del nuevo empleador';
 }

else if (this.amaterno.hasError('pattern')) {
 return 'Inserte letras';
 }

 return this.amaterno.hasError('apellido materno invalido') ? 'Apellido invalido' : '';
}

 getErrorMessageNum() {
 if (this.num.hasError('minlength')) {
 return 'Minimo 8 digitos';
 }

 else if (this.num.hasError('maxlength')) {
 return 'Maximo 8 digitos';
 }
else if (this.num.hasError('pattern')) {
 return 'Inserte numeros';
 }
else if (this.num.hasError('required')) {
 return 'Inserte el numero';
 }
 return this.num.hasError('numero telefonico') ? 'Numero de telefono invalido' : '';
}

 getErrorMessageTarjeta() {
 if (this.tarjeta.hasError('minlength')) {
 return 'Minimo 8 digitos';
 }

 else if (this.tarjeta.hasError('maxlength')) {
 return 'Maximo 8 digitos';
 }
else if (this.tarjeta.hasError('pattern')) {
 return 'Inserte numeros';
 }
else if (this.tarjeta.hasError('required')) {
 return 'Inserte el numero de tarjeta';
 }
 return this.tarjeta.hasError('numero de tarjeta') ? 'Numero de tarjeta invalido' : '';
}

getErrorMessageDepartamento() {
  return this.departamento.hasError('required') ? 'El departamento es obligatorio' : '';
}

getErrorMessageRol() {
  return this.rol.hasError('required') ? 'El rol es obligatorio' : '';
}


getErrorMessageFecha() {
  return this.fecha.hasError('required') ? 'La fecha es obligatoria' : '';
}


}
