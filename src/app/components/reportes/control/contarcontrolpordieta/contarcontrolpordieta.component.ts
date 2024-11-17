import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { ControlService } from '../../../../services/control.service';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-contarcontrolpordieta',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './contarcontrolpordieta.component.html',
  styleUrls: ['./contarcontrolpordieta.component.css']
})
export class ContarcontrolpordietaComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private cS: ControlService) {}

  ngOnInit(): void {
    this.cS.getControlesPorDieta().subscribe((data) => {
      this.barChartLabels = data.map((item) => `Dieta ${item.idDieta}`);
      this.barChartData = [
        {
          data: data.map((item) => item.totalControles),
          label: 'Controles por Dieta',
          backgroundColor: ['#8a47eb', '#a163f8', '#b87ff5', '#cea2ff', '#e0c1ff'],
          borderColor: '#8a47eb',
          borderWidth: 1,
        },
      ];
    });
  }
}
