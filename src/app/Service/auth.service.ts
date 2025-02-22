import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  Token: string | any;
  user: any = new BehaviorSubject(null);
  private apiUrl = 'https://vn-fe-test-api.iwalabs.info/auth';
  constructor(private HttpClient: HttpClient, private _Router: Router) {
    const Token = localStorage.getItem('userToken');
    if (Token !== null) {
      this.decodeUser();
    }
  }
  decodeUser() {
    this.user.next(this.Token);
  }
  login(username: string, password: string): Observable<any> {
    const body = {
      data: {
        type: 'auth',
        attributes: { username, password },
      },
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/vnd.api+json',
      'authentication': 'Aa123456',
    });
    return this.HttpClient.post(this.apiUrl, body, { headers });
  }
  logOut() {
    localStorage.removeItem('userToken');
    this.user.next(null);
    this._Router.navigate(['/House']);
  }
}
