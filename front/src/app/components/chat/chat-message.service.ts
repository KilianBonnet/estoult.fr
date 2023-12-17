import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { ChatService } from "./chat.service";
import { ApiService } from "../../services/api.service";

export interface Message {
  author: string;
  content: string;
  timestamp: Date;
}

@Injectable()
export class ChatMessageService {
  private messageApiUrl: string;
  
  public messages: Message[] = [];
  private messageSubject = new Subject<Message>();
  public $message: Observable<Message> = this.messageSubject.asObservable(); 

  constructor(
    private chatService: ChatService,
    private httpClient: HttpClient,
    private apiService: ApiService,
  ) 
  {
    this.messageApiUrl = `${this.apiService.getHttpProtocol()}://${this.apiService.host}/${this.apiService.chatApiPath}/messages`;
  }

  public registerMessage(message: Message): void {
    this.messageSubject.next(message);
    this.messages = [message, ...this.messages]
  }

  public flushMessages(): void{
    this.messages = [];
  }

  public initMessages(): void {
    this.fetchMessages().subscribe(messages => {
      this.messages = messages;
      this.messageSubject.next(this.messages[0]);
    });
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