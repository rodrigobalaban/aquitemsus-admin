import { Injectable } from '@angular/core';
import { Establishment } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class EstablishmentContextService {
  private readonly keyStorage = 'ESTABLISHMENT_AQUITEMSUS';

  constructor() {}

  setContext(establishment: Establishment) {
    localStorage.setItem(this.keyStorage, JSON.stringify(establishment));
  }

  getContext(): Establishment | null {
    const establishment = localStorage.getItem(this.keyStorage);

    if (!establishment) {
      return null;
    }

    return JSON.parse(establishment);
  }
}
