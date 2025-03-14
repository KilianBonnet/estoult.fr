import { Component, ElementRef, OnDestroy, OnInit, AfterViewChecked, ViewChild } from '@angular/core';
import { ChatService } from './chat.service';
import { CommonModule } from '@angular/common';
import { ChatMessageService } from './chat-message.service';
import { ChatSocketService } from './chat-socket.service';
import { SidePictureComponent } from "../side-picture/side-picture.component";
import { HeaderComponent } from "../header/header.component";
import { ChatMessageComponent } from "./chat-message/chat-message.component";
import { ChatMessageInputComponent } from "./chat-message-input/chat-message-input.component";
import { Router } from '@angular/router';

@Component({
    selector: 'app-chat',
    standalone: true,
    templateUrl: './chat.component.html',
    styleUrl: './chat.component.css',
    providers: [ChatService, ChatMessageService, ChatSocketService],
    imports: [CommonModule, SidePictureComponent, HeaderComponent, ChatMessageComponent, ChatMessageInputComponent]
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('messageContainer') messageContainer!: ElementRef;
  private nbMessageDisplayed: number = 0;

  constructor(
    public router: Router,
    public chatService: ChatService,
    public chatMessageService: ChatMessageService,
    public chatSocketService: ChatSocketService
  ) {}

  ngAfterViewChecked(): void {
    if(this.chatMessageService.messages.length != this.nbMessageDisplayed) {
      this.scrollToBottom();
      this.nbMessageDisplayed = this.chatMessageService.messages.length;
    }
  }

  private scrollToBottom(): void {
    this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
  }

  ngOnInit(): void {
    this.chatService.initUser();
    this.chatMessageService.initMessages();
    this.chatSocketService.openConnection();
  }

  ngOnDestroy(): void {
    this.chatSocketService.closeConnection();
  }
}
