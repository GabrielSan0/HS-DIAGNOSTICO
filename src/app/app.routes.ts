import { Routes } from '@angular/router';
import { FormularioDiagnosticoComponent } from './components/formulario-diagnostico/formulario-diagnostico.component';
import { DashboardAnalisisComponent } from './components/dashboard-analisis/dashboard-analisis.component';

export const routes: Routes = [
  // 👇 AGREGA ESTO PRIMERO: Redirección por defecto
  {
    path: '',
    redirectTo: 'diagnostico',
    pathMatch: 'full'
  },
  // 👇 Tus rutas normales
  {
    path: 'diagnostico',
    component: FormularioDiagnosticoComponent,
    title: 'Diagnóstico GH - Formulario'
  },
  {
    path: 'dashboard',
    component: DashboardAnalisisComponent,
    title: 'Dashboard del GH - Formulario'
  },
  // 👇 OPCIONAL (BUENA PRÁCTICA): Ruta comodín para cualquier URL equivocada
  {
    path: '**',
    redirectTo: 'diagnostico'
  }
];