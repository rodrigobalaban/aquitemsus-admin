import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Establishment } from 'src/app/shared/interfaces';
import { BaseService } from 'src/app/shared/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class EstablishmentService extends BaseService<Establishment> {
  moduleUrl = 'establishments';

  constructor(private _http: HttpClient) {
    super(_http);
  }
}
