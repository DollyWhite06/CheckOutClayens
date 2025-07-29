import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';
import { RegistrarvisitaComponent } from '../registrarvisita/registrarvisita.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FinalizarvisitaComponent } from '../finalizarvisita/finalizarvisita.component';

@Component({
  selector: 'app-registrocaseta',
  imports: [ MatFormFieldModule, MatDialogModule, MatInputModule, FormsModule, ReactiveFormsModule ],
  templateUrl: './registrocaseta.component.html',
  styleUrl: './registrocaseta.component.css'
})
export class RegistrocasetaComponent {
hide = true;


constructor(public dialog: MatDialog) {}
abrirModal() {
  const dialogRef = this.dialog.open(RegistrarvisitaComponent, {
    width: '400px'
  });

  dialogRef.afterClosed().subscribe(resultado => {
    if (resultado) {
      console.log('Visita guardado:', resultado);
    }
  });
}

abrirModal2() {
  const dialogRef = this.dialog.open(FinalizarvisitaComponent, {
    width: '400px'
  });

  dialogRef.afterClosed().subscribe(resultado => {
    if (resultado) {
      console.log('Visita finalizada:', resultado);
    }
  });
}

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
