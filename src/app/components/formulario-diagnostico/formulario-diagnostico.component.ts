import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para ngFor, ngIf, ngClass
import { FormBuilder, FormGroup, FormArray, AbstractControl, ReactiveFormsModule } from '@angular/forms'; // <-- IMPORTAR REACTIVE FORMS AQUÍ
import { DiagnosticoService } from '../../services/diagnostico.service';
import { Macroproceso } from '../../Models/macroproceso.model';
import { Router } from '@angular/router';
import { ChatComponent } from '../chat/chat.component';
import { ChatService, FormActionData } from '../../services/chat.service';

@Component({
  selector: 'app-formulario-diagnostico',
  standalone: true,
  // IMPORTANTE: Listar todos los módulos y servicios necesarios
  imports: [
    CommonModule,
    ReactiveFormsModule, // Módulo para usar FormBuilder, FormGroup, FormArray
    ChatComponent // <-- Importar el componente de Chat
  ],
  templateUrl: './formulario-diagnostico.component.html',
  styleUrl: './formulario-diagnostico.component.css',
  // Si el servicio no está en 'root', se debe proveer aquí, pero asumiremos 'root'
  // providers: [DiagnosticoService] 
})
export class FormularioDiagnosticoComponent implements OnInit {

  // Array de Macroprocesos cargado desde el servicio
  public diagnosticoData: Macroproceso[] = [];

  // El formulario reactivo principal
  public diagnosticoForm: FormGroup = this.fb.group({});

  // Mensaje de estado para el usuario
  public mensajeEstado: string = '';

  constructor(
    // El servicio se inyecta normalmente
    private fb: FormBuilder,
    private diagnosticoService: DiagnosticoService,
    private router: Router,
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
    // 1. Cargar los datos guardados o iniciales
    this.diagnosticoData = this.diagnosticoService.getEncuesta();

    // 2. Construir el formulario reactivo
    this.diagnosticoForm = this.fb.group({
      // Un FormArray para manejar la lista de macroprocesos
      macroprocesos: this.fb.array(
        this.diagnosticoData.map(macroproceso => this.crearMacroprocesoFormGroup(macroproceso))
      )
    });

    // 3. Suscribirse a acciones del Chat
    this.chatService.formAction$.subscribe(acciones => {
      this.procesarAccionesChat(acciones);
    });
  }

  // --- MÉTODOS DE AYUDA (Mismos que en la versión de Módulos) ---

  private crearMacroprocesoFormGroup(macroproceso: Macroproceso): FormGroup {
    return this.fb.group({
      id: [macroproceso.id],
      nombre: [macroproceso.nombre],
      objetivo: [macroproceso.objetivo],
      herramientas: this.fb.array(
        macroproceso.herramientas.map(herramienta => this.crearHerramientaFormGroup(herramienta))
      )
    });
  }

  private crearHerramientaFormGroup(herramienta: any): FormGroup {
    // Nota: Los valores iniciales pueden ser 'null' si la encuesta no ha sido respondida
    return this.fb.group({
      id: [herramienta.id],
      nombre: [herramienta.nombre],
      aporte: [herramienta.aporte],
      existe: [herramienta.existe],
      actualizado: [herramienta.actualizado],
      automatizado: [herramienta.automatizado],
    });
  }

  // --- LOGICA DE INTEGRACION CHAT ---
// En formulario-diagnostico.component.ts
private procesarAccionesChat(acciones: FormActionData[]) {
  console.log('🔄 Procesando acciones del chat:', acciones);
  
  let actualizacionesRealizadas = 0;
  const herramientasActualizadas: string[] = [];
  
  acciones.forEach(accion => {
    // Buscar la herramienta por ID en todos los macroprocesos
    for (let i = 0; i < this.macroprocesosControls.length; i++) {
      const macroFormGroup = this.macroprocesosControls.at(i) as FormGroup;
      const herramientasArray = macroFormGroup.get('herramientas') as FormArray;
      
      for (let j = 0; j < herramientasArray.length; j++) {
        const herramientaControl = herramientasArray.at(j) as FormGroup;
        const herramientaId = herramientaControl.get('id')?.value;
        
        if (herramientaId === accion.herramientaId) {
          // Obtener el nombre de la herramienta para el mensaje
          const nombreHerramienta = herramientaControl.get('nombre')?.value;
          
          // Actualizar solo los campos que vienen en la acción
          const valoresActuales = herramientaControl.value;
          const nuevosValores = {
            ...valoresActuales,
            ...accion.valores  // Merge: sobrescribe solo los campos proporcionados
          };
          
          herramientaControl.patchValue(nuevosValores);
          actualizacionesRealizadas++;
          herramientasActualizadas.push(`${herramientaId}. ${nombreHerramienta}`);
          
          console.log(`✅ Herramienta ID ${herramientaId} actualizada:`, nuevosValores);
          break;
        }
      }
    }
  });
  
  if (actualizacionesRealizadas > 0) {
    // Crear mensaje descriptivo
    if (herramientasActualizadas.length <= 3) {
      this.mensajeEstado = `🤖 Actualizadas: ${herramientasActualizadas.join(', ')}`;
    } else {
      this.mensajeEstado = `🤖 Actualizadas ${actualizacionesRealizadas} herramientas`;
    }
    
    // Limpiar mensaje después de 3 segundos
    setTimeout(() => {
      this.mensajeEstado = '';
    }, 3000);
    
    // Forzar detección de cambios
    this.diagnosticoForm.updateValueAndValidity();
  } else {
    console.warn('⚠️ No se encontraron herramientas para actualizar');
  }
}

  // --- GETTERS ---

  get macroprocesosControls(): FormArray {
    return this.diagnosticoForm.get('macroprocesos') as FormArray;
  }

  getHerramientasControls(macroprocesoControl: AbstractControl): FormArray {
    return macroprocesoControl.get('herramientas') as FormArray;
  }

  // --- LÓGICA DE GUARDADO ---

  onSubmit(): void {
    if (this.diagnosticoForm.invalid) {
      this.mensajeEstado = '⚠️ Por favor, revisa el formulario. Asegúrate de haber respondido todas las preguntas.';
      // Opcional: Marcar todos los controles como 'touched' para mostrar errores
      this.diagnosticoForm.markAllAsTouched();
      return;
    }

    const formValue: { macroprocesos: Macroproceso[] } = this.diagnosticoForm.value;

    // Guardar los datos actualizados en LocalStorage
    this.diagnosticoService.saveEncuesta(formValue.macroprocesos);

    this.mensajeEstado = '✅ Diagnóstico guardado exitosamente en LocalStorage.';
    console.log('Diagnóstico Guardado:', formValue.macroprocesos);

    // Opcional: Recargar los datos para confirmar
    this.diagnosticoData = this.diagnosticoService.getEncuesta();
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 1000);
  }

  resetFormulario(): void {
    const nuevaEncuesta = this.diagnosticoService.resetEncuesta();
    this.diagnosticoData = nuevaEncuesta;
    this.ngOnInit(); // Reinicializa el formulario con los valores por defecto (null)
    this.mensajeEstado = '🔄 Formulario reiniciado a la configuración inicial.';
  }

  getAporteClass(aporte: string): string {
    switch (aporte) {
      case 'Esencial': return 'aporte-esencial';
      case 'Estratégica': return 'aporte-estrategica';
      case 'Necesaria': return 'aporte-necesaria';
      default: return '';
    }
  }
}