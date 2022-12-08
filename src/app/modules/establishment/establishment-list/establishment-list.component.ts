import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { UserRole } from 'src/app/shared/enums';
import { Establishment } from 'src/app/shared/interfaces';
import { AuthService } from 'src/app/shared/services';
import { EstablishmentService } from '../services';

@Component({
  selector: 'app-establishment-list',
  templateUrl: './establishment-list.component.html',
  styleUrls: ['./establishment-list.component.scss'],
})
export class EstablishmentListComponent extends BaseListComponent<Establishment> {
  isAdmin = false;
  displayedColumns: string[] = [
    'name',
    'category',
    'city',
    'scheduling',
    'delete',
  ];

  constructor(
    private _authService: AuthService,
    protected establishmentService: EstablishmentService,
    protected router: Router
  ) {
    super(router, establishmentService);
    this.checkUserRole();
  }

  checkUserRole(): void {
    const userSession = this._authService.getUserAuthSession();
    this.isAdmin = userSession.role === UserRole.Administrator;
  }
}
