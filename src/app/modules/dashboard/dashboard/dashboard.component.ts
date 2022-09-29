import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { ScheduleReport } from 'src/app/shared/interfaces';
import { EstablishmentContextService } from 'src/app/shared/services/establishment-context.service';
import { ScheduleService } from '../../schedule/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  attendanceChartLabels!: string[];
  attendanceChartDatasets!: ChartConfiguration<'doughnut'>['data']['datasets'];

  scheduleChartLabels: string[] = [];
  scheduleChartDatasets!: ChartConfiguration<'bar'>['data']['datasets'];
  scheduleChartOptions: ChartConfiguration<'bar'>['options'];

  idEstablishment?: number;
  today = new Date();
  scheduleReport?: ScheduleReport;

  constructor(
    private _establishmentContextService: EstablishmentContextService,
    private _scheduleService: ScheduleService
  ) {
    this.idEstablishment = this._establishmentContextService.getContext()?.id;
  }

  async ngOnInit(): Promise<void> {
    if (!this.idEstablishment) {
      return;
    }

    await this.getScheduleReport();
    this.setAttendanceChart();
    this.setSchedulesPerMonthChart();
  }

  async getScheduleReport(): Promise<void> {
    this.scheduleReport = await this._scheduleService.getScheduleReport(
      this.idEstablishment!
    );
  }

  setAttendanceChart() {
    this.attendanceChartLabels = ['Comparecido', 'Não Comparecido'];
    this.attendanceChartDatasets = [
      {
        data: [
          this.scheduleReport!.schedulesAttendance,
          100 - this.scheduleReport!.schedulesAttendance,
        ],
        backgroundColor: ['#fff', '#67a4ea'],
        borderColor: 'transparent',
        hoverBackgroundColor: ['#fff', '#67a4ea'],
        hoverBorderColor: ['#fff', '#67a4ea'],
      },
    ];
  }

  setSchedulesPerMonthChart() {
    const schedules: number[] = [];

    this.scheduleReport?.schedulesPerMonth.forEach((item) => {
      this.scheduleChartLabels.push(item.month + '/' + item.year);
      schedules.push(item.schedules);
    });

    this.scheduleChartDatasets = [
      {
        data: schedules,
        backgroundColor: '#418de4',
        borderColor: 'transparent',
        hoverBackgroundColor: '#418de4',
        hoverBorderColor: '#418de4',
      },
    ];

    this.scheduleChartOptions = {
      scales: {
        x: {          
          grid: {
            borderWidth: 0,
            display: false,
          },
        },
        y: {
          display: false,
          grid: {
            display: false,
          },
        },
      },
    };
  }
}
