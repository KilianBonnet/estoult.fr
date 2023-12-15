import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiService {
  host: string = 'estoult.fr';
  chatApiPath: string = 'api/chat';

  public isTLSConnection(): boolean {
    return location.protocol === 'https:';
  }

  public getHttpProtocol(): string {
    return this.isTLSConnection() ? 'https' : 'http';
  }

  public getWsProtocol(): string {
    return this.isTLSConnection() ? 'ws' : 'ws';
  }
}