import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RatingRoutingModule } from './rating-routing.module';
import { RatingPanelComponent } from './rating-panel/rating-panel.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    RatingPanelComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatIconModule,
    RatingRoutingModule
  ]
})
export class RatingModule { }
