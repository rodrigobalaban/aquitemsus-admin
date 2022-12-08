import { User } from "./user";

export interface UserCredential extends User {
  token: string;
  expirationTime: Date;
}
