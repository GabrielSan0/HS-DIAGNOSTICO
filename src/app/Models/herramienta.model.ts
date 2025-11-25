export interface HerramientaGH {
  id: number;
  nombre: string;
  aporte: 'Esencial' | 'Necesaria' | 'Estratégica' | 'Importante'; // Basado en la columna "Aporte" del Excel
  
  // Respuestas del Diagnóstico
  existe: boolean | null; // ¿Existe?
  actualizado: boolean | null; // ¿Actualizado?
  automatizado: boolean | null; // ¿Automatizado?
  
  // Propiedades adicionales para el Dashboard (opcional)
  procesoId?: number;
  macroprocesoId?: number;
}