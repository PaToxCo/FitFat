import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { ObjetivosService } from '../../../../services/objetivos.service';

Chart.register(...registerables);

@Component({
  selector: 'app-obtenerfechasporestado',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './obtenerfechasporestado.component.html',
  styleUrls: ['./obtenerfechasporestado.component.css'],
})
export class ObtenerFechasPorEstadoComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private objetivosService: ObjetivosService) {}

  ngOnInit(): void {
    this.objetivosService.obtenerFechasPorEstado().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.estado);
      this.barChartData = [
        {
          data: data.map((item) => new Date(item.fecha_inicio_min).getTime()), 
          backgroundColor: ['#8a47eb', '#a163f8', '#b87ff5', '#cea2ff', '#e0c1ff'],
          borderColor: '#8a47eb',
          borderWidth: 1,
        },
        {
          data: data.map((item) => new Date(item.fecha_inicio_max).getTime()),
          label: 'Fecha Inicio Máxima',
          backgroundColor: ['#a163f8', '#b87ff5', '#cea2ff', '#e0c1ff'],
          borderColor: '#8a47eb',
          borderWidth: 1,
        },
      ];
    });
  }
}
