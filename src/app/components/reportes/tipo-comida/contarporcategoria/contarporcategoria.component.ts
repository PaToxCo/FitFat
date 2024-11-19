import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { TipoComidaService,  } from '../../../../services/tipo-comida.service';
import { NgChartsModule } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { ContarTiposPorCategoriaDTO } from '../../../../models/dtos/ContarTiposPorCategoriaDTO';

Chart.register(...registerables);

@Component({
  selector: 'app-contarporcategoria',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './contarporcategoria.component.html',
  styleUrls: ['./contarporcategoria.component.css']
})
export class ContarporcategoriaComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'pie';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private tS: TipoComidaService) {}

  ngOnInit(): void {
    this.tS.contarTiposPorCategoria().subscribe((data: ContarTiposPorCategoriaDTO[]) => {
      this.barChartLabels = data.map((item) => item.categoria);
      this.barChartData = [
        {
          data: data.map((item) => item.cantidad),
          label: 'Cantidad de Tipos de Comida por Categoría',
          backgroundColor: ['#8a47eb', '#a163f8', '#b87ff5', '#cea2ff', '#e0c1ff'],
          borderColor: '#8a47eb',
          borderWidth: 1
        },
      ];
    });
  }
}
