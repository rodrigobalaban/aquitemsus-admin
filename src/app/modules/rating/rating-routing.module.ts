import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RatingPanelComponent } from './rating-panel';

const routes: Routes = [
  {
    path: '',
    component: RatingPanelComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RatingRoutingModule {}
