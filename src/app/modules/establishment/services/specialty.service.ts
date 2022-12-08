import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Specialty } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {
  moduleUrl = 'specialties';

  constructor(private _http: HttpClient) {}

  getAll(
    search: string,
    page: number,
    pageSize: number
  ): Observable<Specialty[]> {
    return this._http
      .get<Specialty[]>(
        `${environment.apiUrl}/${this.moduleUrl}?search=${search}&page=${page}&pagesize=${pageSize}`
      );
  }
}
