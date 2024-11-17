import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { UsuariosService } from '../../../../services/usuarios.service';

Chart.register(...registerables);

@Component({
  selector: 'app-contarusuariosporrol',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './contarusuariosporrol.component.html',
  styleUrls: ['./contarusuariosporrol.component.css'],
})
export class ContarusuariosporrolComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private uS: UsuariosService) {}

  ngOnInit(): void {
    this.uS.obtenerUsuariosPorRol().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.nombreRol);
      this.barChartData = [
        {
          data: data.map((item) => item.cantidadUsuarios),
          label: 'Usuarios por rol',
          backgroundColor: ['#8a47eb', '#a163f8', '#b87ff5', '#cea2ff', '#e0c1ff'],
          borderColor: '#8a47eb',
          borderWidth: 1,
        },
      ];
    });
  }
}
