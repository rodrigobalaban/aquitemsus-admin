import { Establishment } from "./establishment";
import { Professional } from "./professional";
import { User } from "./user";

export interface Schedule {
    id: number;
    establishment: Establishment;
    date: string;
    status: number;
    userSus: User;
    professional: Professional;
}
