import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { ComidaService } from '../../../../services/comida.service';
import { NgChartsModule } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-sumacaloriasusuario',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './sumacaloriasusuario.component.html',
  styleUrls: ['./sumacaloriasusuario.component.css']
})
export class SumacaloriasusuarioComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private cS: ComidaService) {}

  ngOnInit(): void {
    this.cS.obtenerSuma().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.nombreUsuario);
      this.barChartData = [
        {
          data: data.map((item) => item.sumaCalorias),
          label: 'Suma de calorías acumuladas de todas las comidas por usuario',
          backgroundColor: ['#8a47eb', '#a163f8', '#b87ff5', '#cea2ff', '#e0c1ff'],
          borderColor: '#8a47eb',
          borderWidth: 1
        },
      ];
    });
  }
}
