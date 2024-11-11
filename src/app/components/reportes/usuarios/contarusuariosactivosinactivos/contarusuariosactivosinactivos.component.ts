import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { UsuariosService } from '../../../../services/usuarios.service';


Chart.register(...registerables);

@Component({
  selector: 'app-contarusuariosactivosinactivos',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './contarusuariosactivosinactivos.component.html',
  styleUrls: ['./contarusuariosactivosinactivos.component.css'],
})
export class ContarusuariosactivosinactivosComponent implements OnInit {
  // Configuración del gráfico
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private uS: UsuariosService) {}

  ngOnInit(): void {
    this.uS.contarUsuariosActivosInactivos().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.estadoUsuario);
      this.barChartData = [
        {
          data: data.map((item) => item.cantidad),
          label: 'Usuarios activos/inactivos',
          backgroundColor: ['#22712e', '#8cdf99'],
          borderColor: '#22712e',
          borderWidth: 1,
        },
      ];
    });
  }
}
