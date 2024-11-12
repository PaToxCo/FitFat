import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { RecetaService } from '../../../../services/receta.service';

Chart.register(...registerables);

@Component({
  selector: 'app-contarrecetaporcomida',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './contarrecetaporcomida.component.html',
  styleUrls: ['./contarrecetaporcomida.component.css'],
})
export class ContarrecetaporcomidaComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private rS: RecetaService) {}

  ngOnInit(): void {
    this.rS.getRecetasCountByComida().subscribe((data) => {
       console.log(data);
      this.barChartLabels = data.map((item) => `Comida ${item.comidaId}`);
      this.barChartData = [
        {
          data: data.map((item) => item.totalRecetas),
          label: 'Cantidad de recetas por comida',
          backgroundColor: ['#8a47eb', '#a163f8', '#b87ff5', '#cea2ff', '#e0c1ff'],
          borderColor: '#8a47eb',
          borderWidth: 1,
        },
      ];
    });
  }
  
}
