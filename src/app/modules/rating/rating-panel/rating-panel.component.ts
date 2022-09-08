import { Component, OnInit } from '@angular/core';
import { Establishment, Rating, RatingAvg } from 'src/app/shared/interfaces';
import { EstablishmentContextService } from 'src/app/shared/services/establishment-context.service';
import { RatingService } from '../services/rating.service';

@Component({
  selector: 'app-rating-panel',
  templateUrl: './rating-panel.component.html',
  styleUrls: ['./rating-panel.component.scss'],
})
export class RatingPanelComponent implements OnInit {
  establishmentContext: Establishment;
  ratings: Rating[] = [];
  ratingAvg?: RatingAvg;

  constructor(
    private _establishmentContextService: EstablishmentContextService,
    private _ratingService: RatingService
  ) {
    this.establishmentContext = this._establishmentContextService.getContext()!;
  }

  ngOnInit(): void {
    this.findRatingAvg();
    this.findRatings();
  }

  async findRatingAvg(): Promise<void> {
    this.ratingAvg = await this._ratingService.getRatingAvg(
      this.establishmentContext.id
    );
  }

  async findRatings(): Promise<void> {
    this.ratings = await this._ratingService.getRatings(this.establishmentContext.id);
  }
}
