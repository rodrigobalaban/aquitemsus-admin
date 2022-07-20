import { Address } from "./address";
import { Category } from "./category";
import { Localization } from "./localization";
import { OpeningHours } from "./opening-hours";
import { Specialty } from "./specialty";

export interface Establishment {
  id: number;
  name: string;
  category: Category;
  alwaysOpen: boolean;
  openingHours: OpeningHours[];
  localization: Localization;
  address: Address;
  email: string;
  phone: string;
  specialties: Specialty[];
  professionals: any[];
}
