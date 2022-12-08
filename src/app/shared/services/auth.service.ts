import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuth, UserCredential } from '../interfaces';
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

  get token(): string {
    const userSession = this.getUserAuthSession();
    return 'Bearer ' + userSession?.token;
  }

  authenticate(userCredential: UserAuth): Promise<UserCredential> {
    return this.http
      .post<UserCredential>(`${environment.apiUrl}/auth`, userCredential)
      .pipe(tap((credential) => this.saveUserAuthSession(credential)))
      .toPromise();
  }

  private saveUserAuthSession(userCredential: UserCredential): void {
    localStorage.setItem(this.sessionStorage, JSON.stringify(userCredential));
  }

  private tokenIsValid(): boolean {
    const userSession = this.getUserAuthSession();
    const tokenExpiration = new Date(userSession?.expirationTime);
    const now = new Date();

    return tokenExpiration > now;
  }

  getUserAuthSession(): UserCredential {
    return JSON.parse(
      localStorage.getItem(this.sessionStorage)!
    ) as UserCredential;
  }

  logout(): void {
    localStorage.clear();
  }
}
