import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelComponent } from './panel';
import { ScheduleFormComponent } from './schedule-form';

const routes: Routes = [
  { path: '', component: PanelComponent },
  { path: 'novo', component: ScheduleFormComponent },
  { path: ':id', component: ScheduleFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScheduleRoutingModule {}
