import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { DietaService } from '../../../../services/dieta.service';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-duraciondietasporusuario',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './duraciondietasporusuario.component.html',
  styleUrl: './duraciondietasporusuario.component.css'
})
export class DuraciondietasporusuarioComponent implements OnInit{
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
  constructor(private dS: DietaService) {}

  ngOnInit(): void {
    this.dS.duracionTotalDietas().subscribe((data) => {
      this.barChartLabels = data.map((item) => `Usuario ${item.id_usuario}`);
      this.barChartData = [
        {
          data: data.map((item) => item.duracion),
          label: 'Duracion de dietas por usuario',
          backgroundColor: ['#a163f8', '#b87ff5', '#cea2ff', '#e0c1ff'],
          borderColor: '#8a47eb',
          borderWidth: 1
        },
      ];
    });
  }
}
