import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { ComidaService } from '../../../../services/comida.service';
import { NgChartsModule } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-cantidadcomidasfavportipo',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './cantidadcomidasfavportipo.component.html',
  styleUrls: ['./cantidadcomidasfavportipo.component.css']
})
export class CantidadcomidasfavportipoComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
    
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'pie';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private cS: ComidaService) {}

  ngOnInit(): void {
    this.cS.cantidadComidasFavoritasPorTipo().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.nombreTipoComida);
      this.barChartData = [
        {
          data: data.map((item) => item.cantidadComidasFavoritas),
          label: 'Cantidad de comidas favoritas por tipo',
          backgroundColor: ['#8a47eb', '#a163f8', '#b87ff5', '#cea2ff', '#e0c1ff'],
          borderColor: '#8a47eb',
          borderWidth: 1
        },
      ];
    });
  }
}
