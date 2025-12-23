import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
  isAction?: boolean; // Si fue un mensaje que provocó una acción
}

// INTERFAZ ACTUALIZADA - Ya no necesita macroproceso y herramienta como strings
// Solo necesita el ID de herramienta y los valores a actualizar
export interface FormActionData {
  herramientaId: number;
  valores: {
    existe?: boolean;
    actualizado?: boolean;
    automatizado?: boolean;
  };
}

// Interfaz para la respuesta del servidor
export interface ChatbotResponse {
  tipo: string;
  mensaje: string;
  datos: FormActionData[];
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private readonly API_URL = 'http://localhost:5678/webhook-test/DiagnosticoGH';

  // Fuente de mensajes para el componente de chat
  private messagesSubject = new BehaviorSubject<ChatMessage[]>([
    { 
      sender: 'bot', 
      text: 'Hola, soy tu asistente de diagnóstico. Puedes decirme cosas como: "El RIT existe y está actualizado" o "Las primeras 3 de planeamiento existen pero no están automatizadas".' 
    }
  ]);
  public messages$ = this.messagesSubject.asObservable();

  // Fuente de acciones para el formulario
  private formActionSubject = new Subject<FormActionData[]>();
  public formAction$ = this.formActionSubject.asObservable();

  // Estado de grabación
  private isListeningSubject = new BehaviorSubject<boolean>(false);
  public isListening$ = this.isListeningSubject.asObservable();

  // Speech Recognition
  private recognition: any;

  constructor(private http: HttpClient) {
    this.initSpeechRecognition();
  }

  private initSpeechRecognition() {
    if ('webkitSpeechRecognition' in window) {
      // @ts-ignore
      this.recognition = new webkitSpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.lang = 'es-ES';
      this.recognition.interimResults = false;

      this.recognition.onstart = () => {
        this.isListeningSubject.next(true);
      };

      this.recognition.onend = () => {
        this.isListeningSubject.next(false);
      };

      this.recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        this.sendMessage(transcript);
      };
      
      this.recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event);
        this.isListeningSubject.next(false);
      };
    } else {
      console.warn('Speech Recognition not supported in this browser.');
    }
  }

  toggleListing() {
    if (!this.recognition) return;
    
    if (this.isListeningSubject.value) {
      this.recognition.stop();
    } else {
      this.recognition.start();
    }
  }

  sendMessage(text: string) {
    if (!text.trim()) return;

    // 1. Agregar mensaje del usuario
    this.addMessage({ sender: 'user', text });

    // 2. Enviar a n8n
    this.http.post<ChatbotResponse>(this.API_URL, { message: text }).subscribe({
      next: (response) => {
        console.log('🔵 Respuesta del chatbot:', response);
        this.handleResponse(response);
      },
      error: (err) => {
        console.error('Error contacting n8n:', err);
        this.addMessage({ 
          sender: 'bot', 
          text: 'Lo siento, hubo un error conectando con el servicio. Por favor, inténtalo de nuevo.' 
        });
      }
    });
  }

  private handleResponse(response: ChatbotResponse) {
    // Verificar que la respuesta tenga el formato esperado
    if (!response || typeof response !== 'object') {
      console.error('Respuesta inválida del servidor:', response);
      this.addMessage({ 
        sender: 'bot', 
        text: 'Recibí una respuesta inesperada del servidor.' 
      });
      return;
    }

    // Mostrar mensaje del bot
    if (response.mensaje) {
      this.addMessage({ sender: 'bot', text: response.mensaje });
    }

    // Procesar acciones del formulario
    if (response.tipo === 'accion_formulario' && response.datos && Array.isArray(response.datos)) {
      console.log('🟢 Datos para actualizar formulario:', response.datos);
      this.formActionSubject.next(response.datos);
    } else if (response.tipo === 'pregunta_clarificacion') {
      // Manejar preguntas de clarificación si las hubiera
      this.addMessage({ 
        sender: 'bot', 
        text: response.mensaje || 'Necesito más información para entender tu solicitud.' 
      });
    }
  }

  private addMessage(msg: ChatMessage) {
    const current = this.messagesSubject.value;
    this.messagesSubject.next([...current, msg]);
  }

  // Método para limpiar el historial (opcional)
  clearHistory() {
    this.messagesSubject.next([
      { 
        sender: 'bot', 
        text: 'Hola, soy tu asistente de diagnóstico. ¿En qué puedo ayudarte?' 
      }
    ]);
  }
}