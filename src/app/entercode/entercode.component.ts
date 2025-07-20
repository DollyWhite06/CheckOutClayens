import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';


@Component({
  selector: 'app-entercode',
  imports: [MatSlideToggle, MatToolbarModule, MatButtonToggleModule, MatCardModule,
    MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule, MatDividerModule, MatButtonModule],
  
  templateUrl: './entercode.component.html',
  styleUrl: './entercode.component.css'
})
export class EntercodeComponent {
hide = true;
  codigo = new FormControl('', [Validators.required, Validators.minLength(6)]);
 
  getErrorMessagecodigo() {
   if (this.codigo.hasError('required')) {
    return 'Ingresa tu  codigo';
   }
 
  return this.codigo.hasError('newpass') ? 'Codigo invalido' : '';
  }
}
