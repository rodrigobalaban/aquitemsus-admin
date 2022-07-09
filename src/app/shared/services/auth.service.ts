import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuth, UserCredential } from '../models';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly sessionStorage = 'USER_AUTH_AQUITEMSUS';

  constructor(private http: HttpClient) {}

  get isAuthenticated(): boolean {
    return this.tokenIsValid();
  }

  authenticate(userCredential: UserAuth) {
    return this.http
      .post<UserCredential>(`${environment.apiUrl}/auth`, userCredential)
      .pipe(tap((credential) => this.saveUserAuthSession(credential)))
      .toPromise();
  }

  logout(): void {
    localStorage.clear();
  }

  private saveUserAuthSession(userCredential: UserCredential): void {
    localStorage.setItem(this.sessionStorage, JSON.stringify(userCredential));
  }

  private tokenIsValid(): boolean {
    const tokenExpiration = new Date(this.getUserAuthSession()?.expirationTime);
    const now = new Date();

    if (tokenExpiration > now) {
      return true;
    }

    return false;
  }

  private getUserAuthSession(): UserCredential {
    return JSON.parse(
      localStorage.getItem(this.sessionStorage)!
    ) as UserCredential;
  }
}
