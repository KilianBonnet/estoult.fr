import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-chat-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.css'
})
export class ChatMessageComponent {
  @Input() author: string = '';
  @Input() content: string = '';
  @Input() timestamp: Date = new Date(0);
  public estoultPicturePath: string;

  constructor(public apiService: ApiService) {
    this.estoultPicturePath = `${apiService.getHttpProtocol()}://${apiService.host}/${apiService.chatApiPath}/estoult.png`;
  }

  getAuthorPart(index: number): string {
    const parts = this.author.split('#');

    if(index === 1) {
      return this.author === 'Estoult' ? '' : `#${parts[index]}`
    }
    return parts[index]
  }
}
