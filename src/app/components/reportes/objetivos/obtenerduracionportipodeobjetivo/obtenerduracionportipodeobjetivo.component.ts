import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { ObjetivosService } from '../../../../services/objetivos.service';

Chart.register(...registerables);

@Component({
  selector: 'app-obtenerduracionportipodeobjetivo',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './obtenerduracionportipodeobjetivo.component.html',
  styleUrls: ['./obtenerduracionportipodeobjetivo.component.css'],
})
export class ObtenerDuracionPorTipoDeObjetivoComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private oS: ObjetivosService) {}

  ngOnInit(): void {
    this.oS.obtenerDuracionPorTipoObjetivo().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.tipo_objetivo);
      this.barChartData = [
        {
          data: data.map((item) => item.duracion_total),
          label: 'Duración por tipo de objetivo (meses)',
          backgroundColor: ['#8a47eb', '#a163f8', '#b87ff5', '#cea2ff', '#e0c1ff'],
          borderColor: '#8a47eb',
          borderWidth: 1,
        },
      ];
    });
  }
}
