import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService<User> {
  moduleUrl: string = 'users';
  private httpWithoutInterceptor: HttpClient;

  constructor(protected http: HttpClient, private handler: HttpBackend) {
    super(http);
    this.httpWithoutInterceptor = new HttpClient(handler);
  }

  resetPassword(userEmail: string): Promise<void> {
    return this.httpWithoutInterceptor
      .post<void>(`${environment.apiUrl}/users/reset-password`, userEmail)
      .toPromise();
  }
}
