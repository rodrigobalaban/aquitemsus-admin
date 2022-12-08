import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PageList } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class BaseService<T> {
  moduleUrl = '';

  constructor(protected http: HttpClient) {}

  async getAll(
    search: string,
    page: number,
    pageSize: number
  ): Promise<PageList<T>> {
    var response = await this.http
      .get<T[]>(
        `${environment.apiUrl}/${this.moduleUrl}?search=${search}&page=${page}&pagesize=${pageSize}`,
        { observe: 'response' }
      )
      .toPromise();

    return {
      totalItems: +response.headers.get('X-Total-Count')!,
      items: response.body!,
    };
  }

  getById(id: number): Promise<T> {
    return this.http
      .get<T>(`${environment.apiUrl}/${this.moduleUrl}/${id}`)
      .toPromise();
  }

  save(entity: T): Promise<T> {
    return this.http
      .post<T>(
        `${environment.apiUrl}/${this.moduleUrl}`,
        JSON.stringify(entity)
      )
      .toPromise();
  }

  update(idEntity: number, entity: T): Promise<T> {
    return this.http
      .put<T>(
        `${environment.apiUrl}/${this.moduleUrl}/${idEntity}`,
        JSON.stringify(entity)
      )
      .toPromise();
  }

  delete(idEntity: number): Promise<void> {
    return this.http
      .delete<void>(`${environment.apiUrl}/${this.moduleUrl}/${idEntity}`)
      .toPromise();
  }
}
