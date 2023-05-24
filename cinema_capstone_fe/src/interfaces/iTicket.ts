export interface ITicket {
  id: number;
  emitDate: Date;
  perDate: Date;
  hours: string;
  seatCode: string;
  owner: Owner;
  boundFilm: BoundFilm;
  boundRoom: BoundRoom;
}

export interface BoundFilm {
  id: number;
  title: string;
  posterPath: string;
  trailerID: string;
}

export interface BoundRoom {
  id: number;
  name: string;
  timetables: string;
}

export interface Owner {
  id: number;
  username: string;
  birthdate: Date;
}
