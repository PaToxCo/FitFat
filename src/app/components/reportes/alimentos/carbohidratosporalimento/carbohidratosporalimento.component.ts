import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { AlimentosService } from '../../../../services/alimentos.service';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-carbohidratosporalimento',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './carbohidratosporalimento.component.html',
  styleUrl: './carbohidratosporalimento.component.css'
})
export class CarbohidratosporalimentoComponent implements OnInit{
  barChartOptions: ChartOptions = {
    responsive: true,
    
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private aS: AlimentosService) {}

  ngOnInit(): void {
    this.aS.carbohidratosalimento().subscribe((data) => {
      this.barChartLabels = data.map((item) => ` ${item.nombre}`);
      this.barChartData = [
        {
          data: data.map((item) => item.carbohidratos),
          label: 'Cantidad de carbohidratos por Alimento',
          backgroundColor: ['#22712e', '#8cdf99', '#30f54f'],
          borderColor: '#22712e',
          borderWidth: 1
        },
      ];
    });
  }
}
