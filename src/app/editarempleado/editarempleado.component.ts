import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'app-editarempleado',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
  ],
  templateUrl: './editarempleado.component.html',
  styleUrls: ['./editarempleado.component.css']
})
export class EditarempleadoComponent {
nombre = new FormControl('', [
  Validators.pattern('^[a-zA-Z ]*$')
]);
  apellidoPaterno = new FormControl('', [Validators.required,  Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')])
  apellidoMaterno = new FormControl('', [Validators.required,  Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')])
  telefono = new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]);
  correo = new FormControl('', [Validators.required, Validators.email]);  
departamento = new FormControl('', Validators.required);
rol = new FormControl('', Validators.required);

  constructor(
    public dialogRef: MatDialogRef<EditarempleadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  cancelar(): void {
    this.dialogRef.close();
  }

  guardar(): void {
    if (
      this.nombre.valid &&
      this.apellidoPaterno.valid &&
      this.apellidoMaterno.valid &&
      this.telefono.valid &&
      this.correo.valid &&
      this.rol.valid &&
      this.departamento.valid
    ) {
      this.dialogRef.close({
        nombre: this.nombre.value,
        apellidoPaterno: this.apellidoPaterno.value,
        apellidoMaterno: this.apellidoMaterno.value,
        telefono: this.telefono.value,
        correo: this.correo.value,
        rol: this.rol.value,
        departamento: this.departamento.value
      });
    }
  }

getErrorMessagecorreo() {
 if (this.correo.hasError('required')) {
 return 'Ingresa email';
 }

 return this.correo.hasError('email') ? 'Email invalido' : '';
 }





  getErrorMessageNombre() {
  if (this.nombre.hasError('pattern')) {
 return 'Inserte letras';
 }

 return this.nombre.hasError('nombre empleado') ? 'Nombre de empleado invalido' : '';
}
getErrorMessageapellidoPaterno() {
 if (this.apellidoPaterno.hasError('required')) {
 return 'Escriba el apellido paterno del  empleado';
 }

else if (this.apellidoMaterno.hasError('pattern')) {
 return 'Inserte letras';
 }

 return this.apellidoMaterno.hasError('apellido paterno invalido') ? 'Apellido invalido' : '';
}
getErrorMessageapellidoMaterno() {
 if (this.apellidoMaterno.hasError('required')) {
 return 'Escriba el apellido materno del empleado';
 }

else if (this.apellidoMaterno.hasError('pattern')) {
 return 'Inserte letras';
 }

 return this.apellidoMaterno.hasError('apellido materno invalido') ? 'Apellido invalido' : '';
}

 getErrorMessagetelefono() {
 if (this.telefono.hasError('minlength')) {
 return 'Minimo 8 digitos';
 }

 else if (this.telefono.hasError('maxlength')) {
 return 'Maximo 8 digitos';
 }
else if (this.telefono.hasError('pattern')) {
 return 'Inserte numeros';
 }
else if (this.telefono.hasError('required')) {
 return 'Inserte el numero';
 }
 return this.telefono.hasError('numero telefonico') ? 'Numero de telefono invalido' : '';
}
getErrorMessageDepartamento() {
  return this.departamento.hasError('required') ? 'El departamento es obligatorio' : '';
}

getErrorMessageRol() {
  return this.rol.hasError('required') ? 'El rol es obligatorio' : '';
}


}
