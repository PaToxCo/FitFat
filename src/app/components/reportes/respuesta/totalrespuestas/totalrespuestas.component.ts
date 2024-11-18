import { Component } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { RespuestaService } from '../../../../services/respuesta.service';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-totalrespuestas',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './totalrespuestas.component.html',
  styleUrl: './totalrespuestas.component.css'
})
export class TotalrespuestasComponent {
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        title: {
          display: true,
          text: 'Días'
        },
        beginAtZero: true
      }
    },
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private rS: RespuestaService) {}

  ngOnInit(): void {
    this.rS.totalrespuestas().subscribe((data) => {
      this.barChartLabels = data.map((item) => `Usuario ${item.Consulta_id}`);
      this.barChartData = [
        {
          data: data.map((item) => item.total_respuestas),
          label: 'Total Respuestas',
          backgroundColor: ['#22712e', '#8cdf99', '#30f54f'],
          borderColor: '#22712e',
          borderWidth: 1
        },
      ];
    });
  }
}
