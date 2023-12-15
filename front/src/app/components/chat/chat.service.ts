import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { ApiService } from '../../services/api.service';

export interface User {
  username: string;
  token: string;
}

@Injectable()
export class ChatService {
  private userApiUrl: string;
  public user: User;
  
  constructor(private httpClient: HttpClient, private apiService: ApiService) {
    this.userApiUrl = `${apiService.getHttpProtocol()}://${apiService.host}/${apiService.chatApiPath}/users`;
    this.user = { username: "", token: "" };
  }

  public initUser(): void {
    this.user = this.getSavedUser();
    this.fetchUser().subscribe(user => {
      this.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    });
  }

  private fetchUser(): Observable<User> {
    return this.httpClient
    .post<User>(this.userApiUrl,
      {},
      { headers: { Authorization: this.user.token } }
    )
  }

  private getSavedUser(): User {
    try {
      const user = JSON.parse(localStorage.getItem('user')!);
      const username =  user.username;
      const token = user.token;
      return {username, token};
    } 
    catch {
      return { username: "", token: "" };
    }
  }
}
