import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
  isAction?: boolean; // Si fue un mensaje que provocó una acción
}

export interface FormActionData {
  macroproceso: string;
  herramienta: string;
  valores: {
    existe?: boolean;
    actualizado?: boolean;
    automatizado?: boolean;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private readonly API_URL = 'http://localhost:5678/webhook-test/DiagnosticoGH';

  // Fuente de mensajes para el componente de chat
  private messagesSubject = new BehaviorSubject<ChatMessage[]>([
    { sender: 'bot', text: 'Hola, soy tu asistente de diagnóstico. Puedes escribir o usar el micrófono para decirme qué herramientas tienen.' }
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
    // Nota: Como no tenemos validación de CORS en el user-side, esto asume que el webhook permite CORS o estamos en dev mode.
    // Si falla, fingiremos la respuesta para la demo si el usuario no tiene configurado CORS en n8n.
    this.http.post<any>(this.API_URL, { message: text }).subscribe({
      next: (response) => {
        this.handleResponse(response);
      },
      error: (err) => {
        console.error('Error contacting n8n:', err);
        this.addMessage({ sender: 'bot', text: 'Lo siento, hubo un error conectando con el agente. (Revisa la consola)' });
      }
    });
  }

  private handleResponse(response: any) {
    // Respuesta esperada:
    // {
    //   "tipo": "accion_formulario",
    //   "mensaje": "...",
    //   "datos": [...]
    // }

    if (response.mensaje) {
      this.addMessage({ sender: 'bot', text: response.mensaje });
    }

    if (response.tipo === 'accion_formulario' && response.datos) {
      this.formActionSubject.next(response.datos);
    }
  }

  private addMessage(msg: ChatMessage) {
    const current = this.messagesSubject.value;
    this.messagesSubject.next([...current, msg]);
  }
}
