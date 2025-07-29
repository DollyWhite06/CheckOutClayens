import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'app-finalizarvisita',
 imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
  ],  templateUrl: './finalizarvisita.component.html',
  styleUrl: './finalizarvisita.component.css'
})
export class FinalizarvisitaComponent {
  horasalida = new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]);

  constructor(
    public dialogRef: MatDialogRef<FinalizarvisitaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  cancelar(): void {
    this.dialogRef.close();
  }

  guardar(): void {
    if (
      this.horasalida.valid 
    ) {
      this.dialogRef.close({
        horasalida: this.horasalida.value
      });
    }
  }

getErrorMessagehorasalida() {
 if (this.horasalida.hasError('pattern')) {
 return 'Inserte numeros';
 }
else if (this.horasalida.hasError('required')) {
 return 'Inserte el hora de salida';
 }
 return this.horasalida.hasError('hora de salida') ? 'Hora de salida invalido' : '';
}
}
