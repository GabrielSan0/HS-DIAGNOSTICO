import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withHashLocation } from '@angular/router'; // 👈 IMPORTANTE: Añadir 'withHashLocation'

import { routes } from './app.routes';
import { provideCharts } from 'ng2-charts';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    // 👇 CAMBIO CLAVE: Agregamos withHashLocation() aquí
    provideRouter(routes, withHashLocation()),
    provideCharts(),
    provideHttpClient() // <-- Agregado para el ChatService
  ]
};