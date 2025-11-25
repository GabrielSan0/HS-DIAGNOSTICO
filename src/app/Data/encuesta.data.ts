import { Macroproceso } from '../Models/macroproceso.model';

export const ENCUESTA_INICIAL: Macroproceso[] = [
  // 1. PLANEAMIENTO ESTRATÉGICO
  {
    id: 1,
    nombre: 'Planeamiento Estratégico Institucional y Gestión Humana',
    objetivo: 'Alinear los objetivos de gestión humana con los objetivos estratégicos institucionales a fin de contribuir a la productividad y sostenibilidad de COLQUISIRI',
    herramientas: [
      { id: 1, nombre: 'Mapa de Procesos', aporte: 'Esencial', existe: null, actualizado: null, automatizado: null },
      { id: 2, nombre: 'Misión, Visión y Valores de la empresa', aporte: 'Esencial', existe: null, actualizado: null, automatizado: null },
      { id: 3, nombre: 'Análisis FODA', aporte: 'Esencial', existe: null, actualizado: null, automatizado: null },
      { id: 4, nombre: 'Objetivos Estratégicos Institucionales', aporte: 'Esencial', existe: null, actualizado: null, automatizado: null },
      { id: 5, nombre: 'Diagrama SIPOC de Procesos de GH', aporte: 'Esencial', existe: null, actualizado: null, automatizado: null },
      { id: 6, nombre: 'Plan operativo y presupuestal de GH', aporte: 'Esencial', existe: null, actualizado: null, automatizado: null },
      { id: 7, nombre: 'Indicadores de Productividad GH', aporte: 'Esencial', existe: null, actualizado: null, automatizado: null },
      { id: 8, nombre: 'Informe resultados Diagnóstico GH', aporte: 'Necesaria', existe: null, actualizado: null, automatizado: null },
    ],
  },

  // 2. ORGANIZACIÓN - DISEÑO Y ESTRUCTURA ORGANIZACIONAL
  {
    id: 2,
    nombre: 'Diseño y Estructura Organizacional',
    objetivo: 'Estructurar los puestos y la base organizacional que impacten en la productividad, la eficiencia operativa y la sostenibilidad de la empresa',
    herramientas: [
      { id: 9, nombre: 'Estructura Orgánica de Puestos', aporte: 'Esencial', existe: null, actualizado: null, automatizado: null },
      { id: 10, nombre: 'Manual de Descripción de Puestos', aporte: 'Esencial', existe: null, actualizado: null, automatizado: null },
      { id: 11, nombre: 'Manual de Perfiles de Puestos', aporte: 'Esencial', existe: null, actualizado: null, automatizado: null },
      { id: 12, nombre: 'Manual de Política de GH', aporte: 'Esencial', existe: null, actualizado: null, automatizado: null },
      { id: 13, nombre: 'Manual de Procedimientos de GH', aporte: 'Importante', existe: null, actualizado: null, automatizado: null },
    ],
  },

  // 3. PROVISIÓN - ATRACCIÓN Y PROVISIÓN DE TALENTO
  {
    id: 3,
    nombre: 'Atracción y Provisión de Talento',
    objetivo: 'Atraer, seleccionar, motivar e integrar personal de alto rendimiento que impacten en la productividad, competitividad y rentabilidad de la organización',
    herramientas: [
      { id: 14, nombre: 'Informe Personal reclutado interno', aporte: 'Necesaria', existe: null, actualizado: null, automatizado: null },
      { id: 15, nombre: 'Informe Personal reclutado terceros', aporte: 'Importante', existe: null, actualizado: null, automatizado: null },
      { id: 16, nombre: 'Pruebas Preguntas Psicológicas', aporte: 'Importante', existe: null, actualizado: null, automatizado: null },
      { id: 17, nombre: 'Pruebas Preguntas Técnicas', aporte: 'Necesaria', existe: null, actualizado: null, automatizado: null },
      { id: 18, nombre: 'Preguntas trampa por puesto', aporte: 'Esencial', existe: null, actualizado: null, automatizado: null },
      { id: 19, nombre: 'Contratos de trabajo', aporte: 'Necesaria', existe: null, actualizado: null, automatizado: null },
      { id: 20, nombre: 'Informe de Control de Contratos', aporte: 'Importante', existe: null, actualizado: null, automatizado: null },
      { id: 21, nombre: 'Programa Inducción a la empresa', aporte: 'Importante', existe: null, actualizado: null, automatizado: null },
      { id: 22, nombre: 'Programa Inducción al Puesto', aporte: 'Esencial', existe: null, actualizado: null, automatizado: null },
    ],
  },

  // 4. DESARROLLO - DESARROLLO Y RETENCIÓN DEL TALENTO
  {
    id: 4,
    nombre: 'Desarrollo y Retención del Talento',
    objetivo: 'Fortalecer las competencias del personal que potencien el desempeño y crecimiento profesional a fin de asegurar la sostenibilidad de COLQUISIRI',
    herramientas: [
      { id: 23, nombre: 'Manual de Competencias Genéricas', aporte: 'Importante', existe: null, actualizado: null, automatizado: null },
      { id: 24, nombre: 'Manual de Competencias Específicas', aporte: 'Esencial', existe: null, actualizado: null, automatizado: null },
      { id: 25, nombre: 'Diagnóstico de Capacitación', aporte: 'Esencial', existe: null, actualizado: null, automatizado: null },
      { id: 26, nombre: 'Programa de Capacitación', aporte: 'Importante', existe: null, actualizado: null, automatizado: null },
      { id: 27, nombre: 'Informe Programa de Capacitación', aporte: 'Importante', existe: null, actualizado: null, automatizado: null },
      { id: 28, nombre: 'Línea de carrera de puestos claves', aporte: 'Esencial', existe: null, actualizado: null, automatizado: null },
      { id: 29, nombre: 'Manual de medición del clima laboral', aporte: 'Esencial', existe: null, actualizado: null, automatizado: null },
      { id: 30, nombre: 'Informe de Clima Laboral', aporte: 'Esencial', existe: null, actualizado: null, automatizado: null },
      { id: 31, nombre: 'Cultura Organizacional', aporte: 'Esencial', existe: null, actualizado: null, automatizado: null },
      { id: 32, nombre: 'Comunicación', aporte: 'Importante', existe: null, actualizado: null, automatizado: null },
    ],
  },

  // 5. COMPENSACIONES - COMPENSACIONES Y BENEFICIOS
  {
    id: 5,
    nombre: 'Compensaciones y Beneficios',
    objetivo: 'Diseñar sistemas competitivos de remuneraciones y beneficios para atraer, retener y motivar talento clave que impacte en la productividad y rentabilidad de la empresa',
    herramientas: [
      { id: 33, nombre: 'Manual de Evaluación de Puestos', aporte: 'Importante', existe: null, actualizado: null, automatizado: null },
      { id: 34, nombre: 'Cuadro de Categorías por puntos', aporte: 'Esencial', existe: null, actualizado: null, automatizado: null },
      { id: 35, nombre: 'Encuesta Salarial y Beneficios del Mercado', aporte: 'Importante', existe: null, actualizado: null, automatizado: null },
      { id: 36, nombre: 'Escalas salariales Grupos Ocupacional', aporte: 'Esencial', existe: null, actualizado: null, automatizado: null },
      { id: 37, nombre: 'Política Salarial de la empresa', aporte: 'Importante', existe: null, actualizado: null, automatizado: null },
    ],
  },

  // 6. ADMINISTRACIÓN - ADMINISTRACIÓN DE PERSONAL Y RR.LL.
  {
    id: 6,
    nombre: 'Administración de Personal y RR.LL.',
    objetivo: 'Gestionar eficientemente la base de datos, las operaciones administrativas, bienestar social y relaciones laborales - sindicales en cumplimiento de las normativas legales',
    herramientas: [
      { id: 38, nombre: 'Base de datos de personal', aporte: 'Esencial', existe: null, actualizado: null, automatizado: null },
      { id: 39, nombre: 'Legajos de Personal digitalizados', aporte: 'Importante', existe: null, actualizado: null, automatizado: null },
      { id: 40, nombre: 'Control de asistencia de personal', aporte: 'Importante', existe: null, actualizado: null, automatizado: null },
      { id: 41, nombre: 'Planillas de pago de personal', aporte: 'Esencial', existe: null, actualizado: null, automatizado: null },
      { id: 42, nombre: 'Programa de vacaciones de personal', aporte: 'Necesaria', existe: null, actualizado: null, automatizado: null },
      { id: 43, nombre: 'Cese y Liquidación de personal', aporte: 'Importante', existe: null, actualizado: null, automatizado: null },
      { id: 44, nombre: 'Plan y presupuesto Bienestar Social', aporte: 'Importante', existe: null, actualizado: null, automatizado: null },
      { id: 45, nombre: 'Informe Ejecución de Bienestar Social', aporte: 'Necesaria', existe: null, actualizado: null, automatizado: null },
      { id: 46, nombre: 'Reglamento Interno de Trabajo (RIT)', aporte: 'Esencial', existe: null, actualizado: null, automatizado: null },
      { id: 47, nombre: 'Resultados de Reclamos laborales', aporte: 'Necesaria', existe: null, actualizado: null, automatizado: null },
    ],
  },
];