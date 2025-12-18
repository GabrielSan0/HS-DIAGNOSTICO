import { Component, ElementRef, ViewChild, AfterViewChecked, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';

@Component({
    selector: 'app-chat',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {
    @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

    isOpen = false;
    userInput = '';

    // Observables del servicio
    messages$ = this.chatService.messages$;
    isListening$ = this.chatService.isListening$;

    constructor(private chatService: ChatService) { }

    ngOnInit(): void {
    }

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
    }

    sendMessage() {
        if (!this.userInput.trim()) return;
        this.chatService.sendMessage(this.userInput);
        this.userInput = '';
    }

    toggleVoice() {
        this.chatService.toggleListing();
    }

    private scrollToBottom(): void {
        try {
            this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
        } catch (err) { }
    }
}
