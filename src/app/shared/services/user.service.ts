import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService<User> {
  moduleUrl: string = 'users';

  constructor(protected http: HttpClient) {
    super(http);
  }

  resetPassword(userEmail: string): Promise<void> {
    return this.http
      .post<void>(`${environment.apiUrl}/users/reset-password`, userEmail)
      .toPromise();
  }
}
