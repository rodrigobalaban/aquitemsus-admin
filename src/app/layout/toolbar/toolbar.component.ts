import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces';
import { AuthService } from 'src/app/shared/services';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  user: User;

  constructor(private _authService: AuthService, private _router: Router) {
    this.user = this._authService.getUserAuthSession();
  }

  logout(): void {
    this._authService.logout();
    this._router.navigate(['/login']);
  }
}
