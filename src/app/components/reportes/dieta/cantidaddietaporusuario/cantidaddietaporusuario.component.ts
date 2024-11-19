import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { DietaService } from '../../../../services/dieta.service';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-cantidaddietaporusuario',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './cantidaddietaporusuario.component.html',
  styleUrl: './cantidaddietaporusuario.component.css'
})
export class CantidaddietaporusuarioComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        title: {
          display: true,
          text: 'Cantidad de dietas'
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
    this.dS.cantidadDietasporUsuario().subscribe((data) => {
      this.barChartLabels = data.map((item) => `Usuario ${item.idUsuario}`);
      this.barChartData = [
        {
          data: data.map((item) => item.cantidad_dietas),
          label: 'Cantidad de dietas por usuario',
          backgroundColor: ['#a163f8', '#b87ff5', '#cea2ff', '#e0c1ff'],
          borderColor: '#8a47eb',
          borderWidth: 1
        },
      ];
    });
  }
}
