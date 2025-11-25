import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartData, ChartType,Chart } from 'chart.js';
import { MacroprocesoResultado } from '../../services/diagnostico.service';
import { BaseChartDirective } from 'ng2-charts';

import { 
  DoughnutController, 
  BarController, 
  CategoryScale, 
  LinearScale, 
  ArcElement, 
  Tooltip, 
  Legend,
  // **AÑADIR ESTE ELEMENTO**
  BarElement 
} from 'chart.js';

@Component({
  selector: 'app-detalle-macroproceso-modal',
  standalone: true,
  imports: [CommonModule,BaseChartDirective],
  templateUrl: './detalle-macroproceso-modal.component.html',
  styleUrl: './detalle-macroproceso-modal.component.css'
})
export class DetalleMacroprocesoModalComponent implements OnInit{

  @Input() macroproceso!: MacroprocesoResultado;
  @Output() close = new EventEmitter<void>(); // Evento para cerrar el modal

  public doughnutChartType: ChartType = 'doughnut';
  public barChartType: ChartType = 'bar';
  public chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' }
    }
  };

  // Datos para los gráficos
  public existenciaData!: ChartData<ChartType>;
  public actualizacionData!: ChartData<ChartType>;
  public automatizacionData!: ChartData<ChartType>;

  constructor() { 
    this.registerChartElements();
  }

  ngOnInit(): void {
    if (!this.macroproceso) return;
    this.createChartData();
  }

  private registerChartElements(): void {
    Chart.register(
      DoughnutController,
      BarController,
      // **Añadir BarElement aquí**
      BarElement, 
      CategoryScale,
      LinearScale,
      ArcElement,
      Tooltip,
      Legend
    );
  }


  createChartData(): void {
    const total = this.macroproceso.totalHerramientas;
    const noExistentes = total - this.macroproceso.existentes;
    const noActualizadas = total - this.macroproceso.actualizadas;
    const noAutomatizadas = total - this.macroproceso.automatizadas;

    // Gráfico 1: Existencia (Doughnut)
    this.existenciaData = {
      labels: ['Existen', 'No Existen'],
      datasets: [{
        data: [this.macroproceso.existentes, noExistentes],
        backgroundColor: ['#28a745', '#dc3545'] // Verde/Rojo
      }]
    };

    // Gráfico 2: Actualización (Barra)
    this.actualizacionData = {
      labels: ['Actualizadas', 'No Actualizadas'],
      datasets: [{
        data: [this.macroproceso.actualizadas, noActualizadas],
        backgroundColor: ['#007bff', '#ffc107'], // Azul/Amarillo
        label: 'Herramientas',
      }]
    };

    // Gráfico 3: Automatización (Doughnut - Foco de la Fase 3)
    this.automatizacionData = {
      labels: ['Automatizadas', 'Falta Automatizar'],
      datasets: [{
        data: [this.macroproceso.automatizadas, noAutomatizadas],
        backgroundColor: ['#17a2b8', '#dc3545'] // Cyan/Rojo (Oportunidad vs. Riesgo)
      }]
    };
  }

  closeModal(): void {
    this.close.emit();
  }
}
