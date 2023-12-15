import { Component } from '@angular/core';
import { ChatMessageService } from '../chat-message.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-chat-message-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat-message-input.component.html',
  styleUrl: './chat-message-input.component.css'
})
export class ChatMessageInputComponent {
  messageContent: string = '';
  constructor(private chatMessageService: ChatMessageService) {}

  public onSendClick(): void {
    this.chatMessageService.sendMessage(this.messageContent).subscribe();
    this.messageContent = '';
  }
}
