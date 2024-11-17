import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { AlimentosService } from '../../../../services/alimentos.service';

Chart.register(...registerables);

@Component({
  selector: 'app-sumartotalcaloriasdedieta',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './sumartotalcaloriasdedieta.component.html',
  styleUrls: ['./sumartotalcaloriasdedieta.component.css'],
})
export class SumartotalcaloriasdedietaComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'pie';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private aS: AlimentosService) {}

  ngOnInit(): void {
    this.aS.totalCalorias().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.dieta);
      this.barChartData = [
        {
          data: data.map((item) => item.totalCalorias),
          label: 'Total de Calorías por Dieta',
          backgroundColor: ['#8a47eb', '#a163f8', '#b87ff5', '#cea2ff', '#e0c1ff'],
          borderColor: '#8a47eb',
          borderWidth: 1,
        },
      ];
    });
  }
}
