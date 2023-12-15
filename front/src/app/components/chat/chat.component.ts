import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { CommonModule } from '@angular/common';
import { ChatMessageService } from './chat-message.service';
import { ChatSocketService } from './chat-socket.service';
import { SidePictureComponent } from "../side-picture/side-picture.component";
import { HeaderComponent } from "../header/header.component";
import { ChatMessageComponent } from "./chat-message/chat-message.component";

@Component({
    selector: 'app-chat',
    standalone: true,
    templateUrl: './chat.component.html',
    styleUrl: './chat.component.css',
    providers: [ChatService, ChatMessageService, ChatSocketService],
    imports: [CommonModule, SidePictureComponent, HeaderComponent, ChatMessageComponent]
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
