import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EstablishmentCategoryService {
  moduleUrl = 'establishments-categories';

  constructor(private _http: HttpClient) {}

  getAll(): Promise<Category[]> {
    return this._http
      .get<Category[]>(`${environment.apiUrl}/${this.moduleUrl}`)
      .toPromise();
  }
}
