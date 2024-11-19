import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { AlimentosService } from '../../../../services/alimentos.service';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-caloriasporalimento',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './caloriasporalimento.component.html',
  styleUrl: './caloriasporalimento.component.css'
})
export class CaloriasporalimentoComponent implements OnInit{
  barChartOptions: ChartOptions = {
    responsive: true,
    
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private aS: AlimentosService) {}

  ngOnInit(): void {
    this.aS.caloriasporalimento().subscribe((data) => {
      this.barChartLabels = data.map((item) => ` ${item.nombre}`);
      this.barChartData = [
        {
          data: data.map((item) => item.calorias),
          label: 'Cantidad de calorias por Alimento',
          backgroundColor: ['#22712e', '#8cdf99', '#30f54f'],
          borderColor: '#22712e',
          borderWidth: 1
        },
      ];
    });
  }
}
