import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatCard, MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-verificacion',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule,MatButtonToggleModule, MatCardModule ],
  templateUrl: './verificacion.component.html',
  styleUrl: './verificacion.component.css'
})
export class VerificacionComponent {

}
