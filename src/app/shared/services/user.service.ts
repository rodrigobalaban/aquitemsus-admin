import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}

  resetPassword(userEmail: string): Promise<void> {
    return this._http
      .post<void>(`${environment.apiUrl}/users/reset-password`, userEmail)
      .toPromise();
  }
}
