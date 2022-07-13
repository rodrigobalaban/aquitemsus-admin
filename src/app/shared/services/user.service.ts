import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models';
import { PageList } from '../models/interfaces';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService<User> {
  moduleUrl: string = 'users';

  constructor(protected http: HttpClient) {
    super(http);
  }

  async getAll(name: string, page: number, pageSize: number): Promise<PageList<User>> {
    var response = await this.http
      .get<User[]>(
        `${environment.apiUrl}/${this.moduleUrl}?name=${name}&page=${page}&pagesize=${pageSize}`,
        { observe: 'response' }
      )
      .toPromise();

    return {
      totalItems: +response.headers.get('X-Total-Count')!,
      items: response.body!,
    };
  }

  resetPassword(userEmail: string): Promise<void> {
    return this.http
      .post<void>(`${environment.apiUrl}/users/reset-password`, userEmail)
      .toPromise();
  }
}
