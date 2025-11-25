
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiagnosticoService, MacroprocesoResultado } from '../../services/diagnostico.service';
import { RouterLink } from '@angular/router'; // Para enlazar al formulario
import { DetalleMacroprocesoModalComponent } from '../detalle-macroproceso-modal/detalle-macroproceso-modal.component';

@Component({
  selector: 'app-dashboard-analisis',
  standalone: true,
  imports: [CommonModule, RouterLink, DetalleMacroprocesoModalComponent],
  templateUrl: './dashboard-analisis.component.html',
  styleUrl: './dashboard-analisis.component.css'
})
export class DashboardAnalisisComponent implements OnInit {

  public resultados: MacroprocesoResultado[] = [];
  public promedioGeneralExistencia: number = 0;
  public promedioGeneralAutomatizacion: number = 0;
  public promedioGeneralActualizacion: number = 0;
  
  public semaforoGlobalExistencia!: 'Rojo' | 'Amarillo' | 'Verde'; // Nuevo
  public semaforoGlobalActualizacion!: 'Rojo' | 'Amarillo' | 'Verde';
  public semaforoGlobalAutomatizacion!: 'Rojo' | 'Amarillo' | 'Verde';

  public isModalOpen: boolean = false;
  public selectedMacroproceso!: MacroprocesoResultado;

  constructor(private diagnosticoService: DiagnosticoService) { }

  ngOnInit(): void {
    this.resultados = this.diagnosticoService.getDashboardResults();
    this.calcularPromediosGlobales();
  }

  calcularPromediosGlobales(): void {
    if (this.resultados.length === 0) return;

    // Calcular promedios
    const sumaPctEx = this.resultados.reduce((sum, res) => sum + res.pctExistente, 0);
    const sumaPctAct = this.resultados.reduce((sum, res) => sum + res.pctActualizado, 0);
    const sumaPctAut = this.resultados.reduce((sum, res) => sum + res.pctAutomatizado, 0);

    const numMacroprocesos = this.resultados.length;

    this.promedioGeneralExistencia = parseFloat((sumaPctEx / numMacroprocesos).toFixed(1)); // Nuevo
    this.promedioGeneralActualizacion = parseFloat((sumaPctAct / numMacroprocesos).toFixed(1));
    this.promedioGeneralAutomatizacion = parseFloat((sumaPctAut / numMacroprocesos).toFixed(1));

    // Aplicar semáforos globales
    this.semaforoGlobalExistencia = this.diagnosticoService.getSemaforoColor(this.promedioGeneralExistencia);
    this.semaforoGlobalActualizacion = this.diagnosticoService.getSemaforoColor(this.promedioGeneralActualizacion);
    this.semaforoGlobalAutomatizacion = this.diagnosticoService.getSemaforoColor(this.promedioGeneralAutomatizacion);
  }

  openModal(macroproceso: MacroprocesoResultado): void {
    this.selectedMacroproceso = macroproceso;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
  
  /**
   * Determina la clase CSS para el indicador de Riesgo.
   */
  getRiesgoClass(riesgo: string): string {
    switch (riesgo) {
      case 'Alto': return 'riesgo-alto';
      case 'Medio': return 'riesgo-medio';
      case 'Bajo': return 'riesgo-bajo';
      default: return '';
    }
  }

  getSemaforoClass(color: 'Rojo' | 'Amarillo' | 'Verde'): string {
    switch (color) {
      case 'Rojo': return 'semaforo-rojo';
      case 'Amarillo': return 'semaforo-amarillo';
      case 'Verde': return 'semaforo-verde';
      default: return '';
    }
  }
}