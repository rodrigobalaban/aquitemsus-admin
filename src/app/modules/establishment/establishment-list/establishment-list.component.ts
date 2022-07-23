import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { Establishment } from 'src/app/shared/interfaces';
import { EstablishmentService } from '../services';

@Component({
  selector: 'app-establishment-list',
  templateUrl: './establishment-list.component.html',
  styleUrls: ['./establishment-list.component.scss'],
})
export class EstablishmentListComponent extends BaseListComponent<Establishment> {
  displayedColumns: string[] = ['name', 'category', 'city', 'scheduling', 'delete'];

  constructor(
    protected establishmentService: EstablishmentService,
    protected router: Router
  ) {
    super(router, establishmentService);
  }
}
