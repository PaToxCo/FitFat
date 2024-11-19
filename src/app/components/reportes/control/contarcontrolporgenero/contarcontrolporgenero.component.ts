import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { ControlService } from '../../../../services/control.service';


@Component({
  selector: 'app-contarcontrolporgenero',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './contarcontrolporgenero.component.html',
  styleUrls: ['./contarcontrolporgenero.component.css']
})
export class ContarcontrolporgeneroComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'pie';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private cS: ControlService) {}

  ngOnInit(): void {
    this.cS.getControlesPorGenero().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.genero);
      this.barChartData = [
        {
          data: data.map((item) => item.totalControles),
          label: 'Controles por Género',
          backgroundColor: ['#8a47eb', '#a163f8', '#b87ff5', '#cea2ff', '#e0c1ff'],
          borderColor: '#8a47eb',
          borderWidth: 1,
        },
      ];
    });
  }
}
