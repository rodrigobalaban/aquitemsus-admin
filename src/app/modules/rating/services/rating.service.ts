import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rating, RatingAvg } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  moduleUrl: string = 'rating';

  constructor(private _http: HttpClient) {}

  getRatingAvg(establishmentId: number): Promise<RatingAvg> {
    return this._http
      .get<RatingAvg>(
        `${environment.apiUrl}/${this.moduleUrl}/avg?establishmentId=${establishmentId}`
      )
      .toPromise();
  }

  getRatings(establishmentId: number): Promise<Rating[]> {
    return this._http
      .get<Rating[]>(
        `${environment.apiUrl}/${this.moduleUrl}?establishmentId=${establishmentId}`
      )
      .toPromise();
  }
}
