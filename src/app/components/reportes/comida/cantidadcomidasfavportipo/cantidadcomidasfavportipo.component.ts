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
          backgroundColor: ['#22712e', '#8cdf99', '#30f54f'],
          borderColor: '#22712e',
          borderWidth: 1
        },
      ];
    });
  }
}
