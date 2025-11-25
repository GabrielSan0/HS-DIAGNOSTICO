import { Injectable } from '@angular/core';
import { Macroproceso } from '../Models/macroproceso.model';
import { ENCUESTA_INICIAL } from '../Data/encuesta.data';

export interface MacroprocesoResultado extends Macroproceso {
  totalHerramientas: number;
  existentes: number;
  actualizadas: number;
  automatizadas: number;
  
  // Nuevas métricas porcentuales
  pctExistente: number; 
  pctActualizado: number;
  pctAutomatizado: number;
  
  // Nuevos campos de semáforo
  semaforoExistente: 'Rojo' | 'Amarillo' | 'Verde';
  semaforoActualizado: 'Rojo' | 'Amarillo' | 'Verde';
  semaforoAutomatizado: 'Rojo' | 'Amarillo' | 'Verde';
  
  nivelRiesgo: 'Alto' | 'Medio' | 'Bajo'; // Riesgo General
}




@Injectable({
  providedIn: 'root'
})
export class DiagnosticoService {

  private readonly LOCAL_STORAGE_KEY = 'encuestaGH';

  constructor() { }

  /**
   * Obtiene la encuesta. Prioriza LocalStorage; si no existe, usa los datos iniciales.
   */
  getEncuesta(): Macroproceso[] {
    const data = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    
    if (data) {
      // Si hay datos en LocalStorage, los retorna
      return JSON.parse(data);
    } else {
      // Si es la primera vez, guarda los datos iniciales y los retorna
      this.saveEncuesta(ENCUESTA_INICIAL);
      return ENCUESTA_INICIAL;
    }
  }

  /**
   * Guarda el estado actual de la encuesta en LocalStorage.
   */
  saveEncuesta(encuesta: Macroproceso[]): void {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(encuesta));
  }
  
  /**
   * (Opcional) Limpia la encuesta en LocalStorage. Útil para pruebas.
   */
  resetEncuesta(): Macroproceso[] {
    localStorage.removeItem(this.LOCAL_STORAGE_KEY);
    return this.getEncuesta(); // Retorna la versión inicial limpia
  }

  getDashboardResults(): MacroprocesoResultado[] {
    const encuesta = this.getEncuesta();
    
    const resultados: MacroprocesoResultado[] = encuesta.map(mp => {
      let existentes = 0;
      let actualizadas = 0;
      let automatizadas = 0;
      const totalHerramientas = mp.herramientas.length;

      mp.herramientas.forEach(h => {
        if (h.existe === true) existentes++;
        if (h.actualizado === true) actualizadas++;
        if (h.automatizado === true) automatizadas++;
      });
      
      // 2. Cálculo de porcentajes
      const pctExistente = totalHerramientas > 0 ? (existentes / totalHerramientas) * 100 : 0;
      const pctActualizado = totalHerramientas > 0 ? (actualizadas / totalHerramientas) * 100 : 0;
      const pctAutomatizado = totalHerramientas > 0 ? (automatizadas / totalHerramientas) * 100 : 0;

      // 3. Aplicación de Semáforos
      const semaforoExistente = this.getSemaforoColor(pctExistente);
      const semaforoActualizado = this.getSemaforoColor(pctActualizado);
      const semaforoAutomatizado = this.getSemaforoColor(pctAutomatizado);

      // Lógica de Riesgo General (Si Actualización o Automatización están en Rojo, el riesgo es Alto)
      let nivelRiesgo: 'Alto' | 'Medio' | 'Bajo';
      if (semaforoActualizado === 'Rojo' || semaforoAutomatizado === 'Rojo') {
        nivelRiesgo = 'Alto'; 
      } else if (semaforoActualizado === 'Amarillo' || semaforoAutomatizado === 'Amarillo') {
        nivelRiesgo = 'Medio';
      } else {
        nivelRiesgo = 'Bajo';
      }

      return {
        ...mp,
        totalHerramientas,
        existentes,
        actualizadas,
        automatizadas,
        pctExistente: parseFloat(pctExistente.toFixed(1)),
        pctActualizado: parseFloat(pctActualizado.toFixed(1)),
        pctAutomatizado: parseFloat(pctAutomatizado.toFixed(1)),
        semaforoExistente,
        semaforoActualizado,
        semaforoAutomatizado,
        nivelRiesgo
      } as MacroprocesoResultado; // Cast para seguridad
    });

    return resultados;
  }

  getSemaforoColor(percentage: number): 'Rojo' | 'Amarillo' | 'Verde' {
    if (percentage >= 76) {
      return 'Verde';
    } else if (percentage >= 51) {
      return 'Amarillo';
    } else { // 0% a 50%
      return 'Rojo';
    }
  }



}

