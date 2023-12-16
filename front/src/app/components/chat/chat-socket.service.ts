import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Message } from './chat-message.service';
import { ApiService } from '../../services/api.service';

@Injectable()
export class ChatSocketService {
  private socket!: WebSocket;
  private socketApiUrl: string;
  private messageSubject: Subject<Message> = new Subject<Message>();

  constructor(apiService: ApiService) {
    this.socketApiUrl = `${apiService.getWsProtocol()}://${apiService.host}/${apiService.chatApiPath}`;
  }

  public openConnection(): void {
    this.socket = new WebSocket(this.socketApiUrl);

    this.socket.addEventListener('message', event => {
      const data = JSON.parse(event.data);
      if(data.op === 12) this.messageSubject.next(data.d);
    });

    this.socket.addEventListener('close', event => {
      if (event.code === 301 || event.code === 302) {
        const redirectUrlMatch = event.reason.match(/Location: (.*)/);
        console.log(redirectUrlMatch);
        if (redirectUrlMatch && redirectUrlMatch[1]) {
          const newUrl = redirectUrlMatch[1];
          this.socket.close();
          this.socket = new WebSocket(newUrl);
        }
      }
    });
  }

  public getMessageObservable(): Observable<Message> {
    return this.messageSubject.asObservable();
  }

  public closeConnection(): void {
    this.socket.close();
    this.messageSubject.complete();
  }
}