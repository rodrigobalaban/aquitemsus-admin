import { SchedulesPerMonth } from "./schedules-per-month";

export interface ScheduleReport {
  schedulesToday: number;
  schedulesReserved: number;
  schedulesAttendance: number;
  schedulesPerMonth: SchedulesPerMonth[];
}
