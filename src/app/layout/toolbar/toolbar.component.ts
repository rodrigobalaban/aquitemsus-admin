import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstablishmentService } from 'src/app/modules/establishment/services';
import { Establishment, User } from 'src/app/shared/interfaces';
import { AuthService } from 'src/app/shared/services';
import { EstablishmentContextService } from 'src/app/shared/services/establishment-context.service';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  establishmentContext!: Establishment;
  establishments: Establishment[] = [];
  user: User;

  constructor(
    private _authService: AuthService,
    private _establishmentContextService: EstablishmentContextService,
    private _establishmentService: EstablishmentService,
    private _router: Router
  ) {
    this.user = this._authService.getUserAuthSession();

    if (this.isEmployee) {
      this.checkEstablishmentContext();
    }
  }

  get isEmployee(): boolean {
    return this.user.role === 'Employee';
  }

  async checkEstablishmentContext(): Promise<void> {
    await this.findEstablishments();
    const context = this._establishmentContextService.getContext();

    if (context) {
      this.establishmentContext = context;
      return;
    }

    this.setContext(this.establishments[0]);
  }

  async findEstablishments(): Promise<void> {
    this.establishments = (
      await this._establishmentService.getAll('', 0, 99)
    ).items;
  }

  setContext(establishment: Establishment): void {
    this.establishmentContext = establishment;
    this._establishmentContextService.setContext(establishment);
  }

  changeContext(establishment: Establishment): void {
    this.setContext(establishment);
    this._router.navigate(['/']);
  }

  logout(): void {
    this._authService.logout();
    this._router.navigate(['/login']);
  }
}
