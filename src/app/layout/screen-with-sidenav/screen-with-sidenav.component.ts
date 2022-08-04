import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/interfaces';
import { AuthService } from 'src/app/shared/services';

@Component({
  selector: 'app-screen-with-sidenav',
  templateUrl: './screen-with-sidenav.component.html',
  styleUrls: ['./screen-with-sidenav.component.scss']
})
export class ScreenWithSidenavComponent {
  user: User;

  constructor(private _authService: AuthService) { 
    this.user = this._authService.getUserAuthSession();
  }

  get userIsAdmin(): boolean {
    return this.user.role === "Administrator";
  }

}
