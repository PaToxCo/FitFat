import { Component } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { AlimentosService } from '../../../../services/alimentos.service';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-grasasporalimento',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './grasasporalimento.component.html',
  styleUrl: './grasasporalimento.component.css'
})
export class GrasasporalimentoComponent {
  barChartOptions: ChartOptions = {
    responsive: true,
    
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private aS: AlimentosService) {}

  ngOnInit(): void {
    this.aS.grasasalimento().subscribe((data) => {
      this.barChartLabels = data.map((item) => ` ${item.nombre}`);
      this.barChartData = [
        {
          data: data.map((item) => item.grasas),
          label: 'Cantidad de grasas por Alimento',
          backgroundColor: ['#22712e', '#8cdf99', '#30f54f'],
          borderColor: '#22712e',
          borderWidth: 1
        },
      ];
    });
  }
}
