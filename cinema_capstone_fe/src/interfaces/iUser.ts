import { ITicket } from "./iTicket";

export interface IUser {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  birthdate: Date;
  email: string;
  cinemaPoints: number;
  tickets: ITicket[];
}

export interface IUserSafe {
  firstname: string;
  lastname: string;
  birthdate: string;
  username: string;
  email: string;
  cinemaPoints: number;
  tickets: ITicket[];
}

export interface UserDto {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  birthdate: Date;
  password: string;
  role: string[];
}

export interface LoginDto {
  username: string;
  password: string;
}
