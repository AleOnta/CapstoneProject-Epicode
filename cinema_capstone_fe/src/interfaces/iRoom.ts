import { ITicket } from "./iTicket";

export interface IRoom {
  id: number;
  name: string;
  totalSeats: number;
  normalSeats: number;
  vipSeats: number;
  timetables: string;
  programs: IRoomProgram[];
  tickets: ITicket[];
}

export interface IRoomProgram {
  id: number;
  status: string;
}
