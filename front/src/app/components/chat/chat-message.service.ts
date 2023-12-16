import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ChatService } from "./chat.service";
import { ApiService } from "../../services/api.service";
import { ChatSocketService } from "./chat-socket.service";

export interface Message {
  author: string;
  content: string;
  timestamp: Date;
}

@Injectable()
export class ChatMessageService {
  private messageApiUrl: string;
  public messages: Message[];

  constructor(
    private chatService: ChatService,
    private httpClient: HttpClient,
    private apiService: ApiService,
  ) 
  {
    this.messageApiUrl = `${apiService.getHttpProtocol()}://${apiService.host}/${apiService.chatApiPath}/messages`;
    this.messages = [];
  }

  public registerMessage(message: Message): void {
    this.messages = [message, ...this.messages]
  }

  public flushMessages(): void{
    this.messages = [];
  }

  public initMessages(): void {
    this.fetchMessages().subscribe(messages => this.messages = messages);
  }

  private fetchMessages(): Observable<Message[]> {
    return this.httpClient.get<Message[]>(this.messageApiUrl);
  }

  public sendMessage(content: string): Observable<Message> {
    return this.httpClient
      .post<Message>(this.messageApiUrl, 
      { content },
      { headers: { Authorization: this.chatService.user.token } }
    );
  }
}