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
  public messageContent: string = '';
  public buttonContent: string = 'Send';
  public canSend: boolean = false;

  private cooldownInterval: any;
  private cooldownCount: number = 0;

  constructor(private chatMessageService: ChatMessageService) {}

  public onInputChange(event: any): void {
    event.target.value =  this.messageContent.replace(/[^a-zA-Z0-9àáâäèéêëìíîïòóôöùúûüç.'"()=+&\[\],!?; ]+/g, '');
    this.canSend = this.messageContent.trim() !== '' && this.cooldownCount <= 0;
}


  public onSendClick(): void {
    if(!this.canSend)
      return;

    this.chatMessageService.sendMessage(this.messageContent)
      .subscribe({
        next: (message) =>  { 
          this.cooldownCount = 5;
          this.cooldownInterval = setInterval(() => this.messageCooldown(), 1_000)
        },
        error: (error) => console.log(error)
      });

    this.messageContent = '';
    this.buttonContent = 'Sending...'
    this.canSend = false;
  }

  private messageCooldown() {
    this.cooldownCount--;
    if(this.cooldownCount <= 0) {
      clearInterval(this.cooldownInterval);
      this.enableSendButton();
      return;
    }

    this.buttonContent = `Wait ${this.cooldownCount}`;
  }

  private enableSendButton() {
    this.buttonContent = 'Send';
    this.canSend = true;
  }
}
