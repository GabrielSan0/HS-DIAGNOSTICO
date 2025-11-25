import { Routes } from '@angular/router';
import { FormularioDiagnosticoComponent } from './components/formulario-diagnostico/formulario-diagnostico.component';
import { DashboardAnalisisComponent } from './components/dashboard-analisis/dashboard-analisis.component';

export const routes: Routes = [
  {
    path: 'diagnostico',
    component: FormularioDiagnosticoComponent, // Carga directa (eager loading)
    title: 'Diagnóstico GH - Formulario'
  },
  {
    path: 'dashboard',
    component: DashboardAnalisisComponent, // Carga directa (eager loading)
    title: 'Dashboard del GH - Formulario'
  },
];
