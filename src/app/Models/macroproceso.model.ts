import { HerramientaGH } from "./herramienta.model";


export interface Macroproceso {
  id: number;
  nombre: string;
  objetivo: string; // Para mostrar contexto de la sección
  herramientas: HerramientaGH[];
  
  // Propiedades de Resumen (Calculadas en el Dashboard)
  totalHerramientas?: number;
  porcentajeActualizado?: number;
  porcentajeAutomatizado?: number;
}

