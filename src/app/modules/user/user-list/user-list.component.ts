import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { User } from 'src/app/shared/interfaces';
import { UserService } from 'src/app/shared/services';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent extends BaseListComponent<User> {
  displayedColumns: string[] = ['name', 'role', 'email', 'delete'];

  constructor(protected router: Router, protected userService: UserService) {
    super(router, userService);
  }

  getUserRoleDescription(userRole: string): string {
    switch (userRole) {
      case 'Administrator':
        return 'Administrador';
      case 'Employee':
        return 'Funcionário';
      default:
        return 'Usuário';
    }
  }
}
