import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Schedule } from 'src/app/shared/interfaces';
import { BaseService } from 'src/app/shared/services/base.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService extends BaseService<Schedule> {
  moduleUrl = 'schedules';

  constructor(protected http: HttpClient) {
    super(http);
  }

  getSchedulesOfDay(
    day: number,
    month: number,
    year: number,
    idEstablishment: number
  ): Promise<Schedule[]> {
    return this.http.get<Schedule[]>(
      `${environment.apiUrl}/${this.moduleUrl}?day=${day}&month=${month}&year=${year}&idEstablishment=${idEstablishment}`
    ).toPromise();
  }

  getDaysOfMonthWithSchedules(
    month: number,
    year: number,
    idEstablishment: number
  ): Promise<number[]> {
    return this.http.get<number[]>(
      `${environment.apiUrl}/${this.moduleUrl}/days-of-month?month=${month}&year=${year}&idEstablishment=${idEstablishment}`
    ).toPromise();
  }

  getReservedSchedules(
    idEstablishment: number
  ): Promise<Schedule[]> {
    return this.http.get<Schedule[]>(
      `${environment.apiUrl}/${this.moduleUrl}/reserved?idEstablishment=${idEstablishment}`
    ).toPromise();
  }
}
