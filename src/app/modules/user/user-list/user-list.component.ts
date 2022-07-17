import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
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

  displayedColumns: string[] = ['name', 'role', 'email', 'delete'];
  search = '';

  constructor(private _router: Router, private _userService: UserService) {}

  ngOnInit(): void {
    this.findAllUsers();
  }

  async findAllUsers(): Promise<void> {
    const pageList = await this._userService.getAll(
      this.search,
      this.page,
      this.pageSize
    );

    this.items = pageList.items;
    this.totalItems = pageList.totalItems;
  }

  navigateTo(id: number): void {
    this._router.navigate(['usuarios', id]);
  }

  async delete(event: Event, id: number): Promise<void> {
    event.stopPropagation();
    
    await this._userService.delete(id);    
    this.findAllUsers();
  }

  paginate(pageEvent: PageEvent) {
    this.page = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;

    this.findAllUsers();
  }
}
