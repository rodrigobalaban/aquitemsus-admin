import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { BaseService } from '../../services/base.service';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-base-list',
  template: '',
  styles: [],
})
export class BaseListComponent<T> implements OnInit {
  items: T[] = [];
  totalItems = 0;
  page = 0;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];

  displayedColumns: string[] = [];
  search = new FormControl('');

  constructor(protected router: Router, protected service: BaseService<T>) {}

  ngOnInit(): void {
    this.observeSearch();
  }

  observeSearch(): void {
    this.search.valueChanges
      .pipe(startWith(''), debounceTime(400), distinctUntilChanged())
      .subscribe(() => {
        this.page = 0;
        this.findAllItems();
      });
  }

  async findAllItems(): Promise<void> {
    const pageList = await this.service.getAll(
      this.search.value,
      this.page,
      this.pageSize
    );

    this.items = pageList.items;
    this.totalItems = pageList.totalItems;
  }

  async delete(event: Event, id: number): Promise<void> {
    event.stopPropagation();

    await this.service.delete(id);
    this.findAllItems();
  }

  paginate(pageEvent: PageEvent) {
    this.page = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;

    this.findAllItems();
  }

  clearSearch(): void {
    this.search.setValue('');
  }
}
