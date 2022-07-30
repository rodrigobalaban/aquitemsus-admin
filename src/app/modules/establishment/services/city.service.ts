import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  moduleUrl = 'cities';

  constructor(private _http: HttpClient) {}

  getAll(
    search: string,
    page: number,
    pageSize: number
  ): Observable<City[]> {
    return this._http
      .get<City[]>(
        `${environment.apiUrl}/${this.moduleUrl}?search=${search}&page=${page}&pagesize=${pageSize}`
      );
  }
}
