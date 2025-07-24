import { Component } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-kpirh',
  imports: [],
  templateUrl: './kpirh.component.html',
  styleUrl: './kpirh.component.css'
})
export class KpirhComponent {

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
