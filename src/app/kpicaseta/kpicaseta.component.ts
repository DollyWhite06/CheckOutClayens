import { Component } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-kpicaseta',
  imports: [],
  templateUrl: './kpicaseta.component.html',
  styleUrl: './kpicaseta.component.css'
})
export class KpicasetaComponent {
  
 ngAfterViewInit() {
  new Chart("asistenciaChart", {
    type: 'doughnut',
    data: {
      labels: ['Asistencia', 'Faltas'],
      datasets: [{
        data: [90, 10],
        backgroundColor: ['#E8821F', '#ddd']
      }]
    },
    options: {
      cutout: '70%',
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });
}
}
