import { Establishment } from "./establishment";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  allowedEstablishments: Establishment[];
}
