import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { CommonModule } from '@angular/common';
import { ChatMessageService } from './chat-message.service';
import { ChatSocketService } from './chat-socket.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
  providers: [ChatService, ChatMessageService, ChatSocketService]
})
export class ChatComponent implements OnInit, OnDestroy{
  constructor(
    public chatService: ChatService,
    public chatMessageService: ChatMessageService,
    public chatSocketService: ChatSocketService
  ) {}

  ngOnInit(): void {
    this.chatService.initUser();
    this.chatMessageService.initMessages();
    this.chatSocketService.openConnection();
  }

  ngOnDestroy(): void {
    this.chatSocketService.closeConnection();
  }
}
