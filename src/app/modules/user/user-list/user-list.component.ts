import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models';
import { UserService } from 'src/app/shared/services';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  items: User[] = [];
  totalItems = 0;
  page = 0;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];

  displayedColumns: string[] = ['name', 'role', 'email'];
  search = '';

  constructor(private _userService: UserService) {}

  ngOnInit(): void {
    this.findAllUsers();
  }

  async findAllUsers(): Promise<void> {
    const pageList = await this._userService.getAll(this.search, this.page, this.pageSize);
    this.items = pageList.items;
    this.totalItems = pageList.totalItems;
    console.log(this.totalItems);
  }
}
