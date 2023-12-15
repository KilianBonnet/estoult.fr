import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiService {
  host: string = 'localhost:8000';
  chatApiPath: string = 'api/chat';

  public isTLSConnection(): boolean {
    return location.protocol === 'https:';
  }

  public getHttpProtocol(): string {
    return this.isTLSConnection() ? 'https' : 'http';
  }

  public getWsProtocol(): string {
    return this.isTLSConnection() ? 'wss' : 'ws';
  }
}