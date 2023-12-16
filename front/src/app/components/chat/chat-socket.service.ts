import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Message } from './chat-message.service';
import { ApiService } from '../../services/api.service';

import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable()
export class ChatSocketService {
  private socket!: WebSocketSubject<Message>;
  private messageSubject: Subject<Message> = new Subject<Message>();

  constructor(apiService: ApiService) {
    const socketUrl = `${apiService.getWsProtocol()}://${apiService.host}/${apiService.chatApiPath}/`;
    this.socket = webSocket(socketUrl);
  }

  public openConnection(): void {
    this.socket.asObservable().subscribe({
      next: (data: any) => {
        if (data.op === 12) {
          this.messageSubject.next(data.d);
        }
      },
      error: (error: any) => {
        console.error('WebSocket error:', error);
      },
      complete: () => {
        
      },
    });
  }

  public getMessageObservable(): Observable<Message> {
    return this.messageSubject.asObservable();
  }

  public closeConnection(): void {
    this.socket.complete();
    this.messageSubject.complete();
  }
}