// import { Component } from '@angular/core';
// import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
// import { RolService } from '../../../../services/rol.service';

// @Component({
//   selector: 'app-rolesactivos',
//   standalone: true,
//   imports: [],
//   templateUrl: './rolesactivos.component.html',
//   styleUrl: './rolesactivos.component.css'
// })
// export class RolesactivosComponent {
//   barChartOptions: ChartOptions = {
//     responsive: true,
    
//   };
//   barChartLabels: string[] = [];
//   barChartType: ChartType = 'pie';
//   barChartLegend = true;
//   barChartData: ChartDataset[] = [];

//   constructor(private rS: RolService) {}

//   ngOnInit(): void {
//     this.rS.listarrolesactivos().subscribe((data) => {
//       this.barChartLabels = data.map((item) => item.descripcion);
//       this.barChartData = [
//         {
//           data: data.map((item) => item.nombre),
//           label: 'Cantidad de comidas favoritas por tipo',
//           backgroundColor: ['#22712e', '#8cdf99', '#30f54f'],
//           borderColor: '#22712e',
//           borderWidth: 1
//         },
//       ];
//     });
//   }
// }
