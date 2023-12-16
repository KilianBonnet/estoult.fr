import { Injectable } from '@angular/core';
import { interval, Observable, Subject } from 'rxjs';
import { Message } from './chat-message.service';
import { ApiService } from '../../services/api.service';

import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable()
export class ChatSocketService {
  private socket!: WebSocketSubject<any>;
  private messageSubject: Subject<Message> = new Subject<Message>();
  private heartBeatInterval: any;

  constructor(apiService: ApiService) {
    const socketUrl = `${apiService.getWsProtocol()}://${apiService.host}/${apiService.chatApiPath}/`;
    this.socket = webSocket(socketUrl);
  }

  public openConnection(): void {
    this.socket.asObservable().subscribe({
      next: (data: any) => {
        if(data.op === 1) {
          console.log("Client is connected to the socket.")
          this.heartBeatInterval = setInterval(() => this.sendHeartBeat(), 10_000);
        }

        if(data.op === 0) {
          console.log(data.d)
        }

        if (data.op === 12) {
          this.messageSubject.next(data.d);
        }
      },
      error: (error: any) => {
        clearInterval(this.heartBeatInterval);
        console.error('WebSocket error:', error);
        setTimeout(() => this.openConnection(), 10_000);
      },
      complete: () => {
        clearInterval(this.heartBeatInterval);
      },
    });
  }

  public getMessageObservable(): Observable<Message> {
    return this.messageSubject.asObservable();
  }

  public sendHeartBeat(): void {
    this.socket.next({op: 3});
  }

  public closeConnection(): void {
    this.socket.complete();
    this.messageSubject.complete();
  }
}