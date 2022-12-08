import { Component, OnInit, Renderer2 } from '@angular/core';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { Establishment, Schedule } from 'src/app/shared/interfaces';
import { EstablishmentContextService } from 'src/app/shared/services/establishment-context.service';
import { ScheduleService } from '../services';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent implements OnInit {
  establishment: Establishment;
  daySelected: Date | null = new Date();
  monthSelected?: Date;
  daysWithSchedules: number[] = [];
  daySchedules: Schedule[] = [];
  reservedSchedules: Schedule[] = [];

  constructor(
    private _establishmentContextService: EstablishmentContextService,
    private _renderer: Renderer2,
    private _scheduleService: ScheduleService
  ) {
    this.establishment = this._establishmentContextService.getContext()!;
  }

  ngOnInit(): void {
    this.findSchedulesOfDay();
    this.findReservedSchedules();
  }

  async findSchedulesOfDay(): Promise<void> {
    this.daySchedules = await this._scheduleService.getSchedulesOfDay(
      this.daySelected!.getDate(),
      this.daySelected!.getMonth() + 1,
      this.daySelected!.getFullYear(),
      this.establishment.id
    );
  }

  async findReservedSchedules(): Promise<void> {
    this.reservedSchedules = await this._scheduleService.getReservedSchedules(
      this.establishment.id
    );
  }

  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      if (date.getMonth() != this.monthSelected?.getMonth()) {
        this.onMonthChange(date);
      }

      return 'day-' + date.getDate();
    };
  }

  async onMonthChange(date: Date): Promise<void> {
    this.monthSelected = date;
    await this.findDaysWithSchedules();

    this.setClassDatesWithSchedules();
  }

  async findDaysWithSchedules(): Promise<void> {
    this.daysWithSchedules =
      await this._scheduleService.getDaysOfMonthWithSchedules(
        this.monthSelected!.getMonth() + 1,
        this.monthSelected!.getFullYear(),
        this.establishment.id
      );
  }

  setClassDatesWithSchedules(): void {
    this.daysWithSchedules.forEach((day) => {
      var elements = document.getElementsByClassName('day-' + day);
      this._renderer.addClass(elements[0], 'has-schedules');
    });
  }

  toDate(dateISOString: string): Date {
    return new Date(dateISOString);
  }

  getStatusDescription(status: string): string {
    switch (status) {
      case 'Available':
        return 'Disponível';
      case 'Reserved':
        return 'Reservado';
      case 'Confirmed':
        return 'Confirmado';
      case 'Complete':
        return 'Completo';
      case 'Canceled':
        return 'Cancelado';
      default:
        return '';
    }
  }

  onConfirmSchedule(schedule: Schedule) {
    schedule.status = 'Confirmed';
    this.updateSchedule(schedule);
  }

  onCancelSchedule(schedule: Schedule) {
    schedule.status = 'Canceled';
    this.updateSchedule(schedule);
  }

  async updateSchedule(schedule: Schedule): Promise<void> {
    await this._scheduleService.update(schedule.id, schedule);
  }
}
