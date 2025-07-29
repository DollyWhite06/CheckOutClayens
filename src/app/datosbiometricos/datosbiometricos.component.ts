import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'app-datosbiometricos',
 imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
  ],   templateUrl: './datosbiometricos.component.html',
  styleUrl: './datosbiometricos.component.css'
})
export class DatosbiometricosComponent {

 huellas = new FormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<DatosbiometricosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  cancelar(): void {
    this.dialogRef.close();
  }

  guardar(): void {
    if (
      this.huellas.valid 
    ) {
      this.dialogRef.close({
        huellas: this.huellas.value
      });
    }
  }

getErrorMessagehuellas() {
 if (this.huellas.hasError('required')) {
 return 'Inserte huellas digitales';
 }
 return this.huellas.hasError('Huellas digitales') ? 'Huellas invalido' : '';
}
}

