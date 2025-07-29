import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';



@Component({
  selector: 'app-registrarvisita',
 imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
  ],  templateUrl: './registrarvisita.component.html',
  styleUrl: './registrarvisita.component.css'
})
export class RegistrarvisitaComponent {
nombre = new FormControl('', [
  Validators.pattern('^[a-zA-Z ]*$')
]);
  apellido = new FormControl('', [Validators.required,  Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')])
  horaentrada = new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]);
departamento = new FormControl('', Validators.required);
fecha = new FormControl('', Validators.required);

  constructor(
    public dialogRef: MatDialogRef<RegistrarvisitaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  cancelar(): void {
    this.dialogRef.close();
  }

  guardar(): void {
    if (
      this.nombre.valid &&
      this.apellido.valid &&
      this.horaentrada.valid &&
      this.fecha.valid &&
      this.departamento.valid
    ) {
      this.dialogRef.close({
        nombre: this.nombre.value,
        apellido: this.apellido.value,
        horaentrada: this.horaentrada.value,
        fecha: this.fecha.value,
        departamento: this.departamento.value
      });
    }
  }

  getErrorMessageNombre() {
  if (this.nombre.hasError('pattern')) {
 return 'Inserte letras';
 }

 return this.nombre.hasError('nombre empleado') ? 'Nombre de visitante invalido' : '';
}
getErrorMessageApellido() {
 if (this.apellido.hasError('required')) {
 return 'Escriba el apellido del  visitante';
 }

else if (this.apellido.hasError('pattern')) {
 return 'Inserte letras';
 }

 return this.apellido.hasError('apellido  invalido') ? 'Apellido invalido' : '';
}
getErrorMessageDepartamento() {
  return this.departamento.hasError('required') ? 'El departamento es obligatorio' : '';
}
getErrorMessageFecha() {
  return this.fecha.hasError('required') ? 'La fecha es obligatorio' : '';
}


 getErrorMessageHoraentrada() {
 if (this.horaentrada.hasError('minlength')) {
 return 'Minimo 8 digitos';
 }

 else if (this.horaentrada.hasError('maxlength')) {
 return 'Maximo 8 digitos';
 }
else if (this.horaentrada.hasError('pattern')) {
 return 'Inserte numeros';
 }
else if (this.horaentrada.hasError('required')) {
 return 'Inserte el numero';
 }
 return this.horaentrada.hasError('numero telefonico') ? 'Numero de telefono invalido' : '';
}

}
