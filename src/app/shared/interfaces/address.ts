import { City } from "./city";

export interface Address {
  number: string;
  complement?: any;
  district: string;
  city: City;
}
