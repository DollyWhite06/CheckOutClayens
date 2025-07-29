import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';
import { EditarempleadoComponent } from '../editarempleado/editarempleado.component';
import { MatDialogModule } from '@angular/material/dialog';



@Component({
  selector: 'app-empleadosrh',
  imports: [ MatFormFieldModule, MatDialogModule, MatInputModule, FormsModule, ReactiveFormsModule ],
  templateUrl: './empleadosrh.component.html',
  styleUrls: ['./empleadosrh.component.css']
})

export class EmpleadosrhComponent {

constructor(public dialog: MatDialog) {}
abrirModal() {
  const dialogRef = this.dialog.open(EditarempleadoComponent, {
    width: '400px'
  });

  dialogRef.afterClosed().subscribe(resultado => {
    if (resultado) {
      console.log('Empleado guardado:', resultado);
    }
  });
}

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
