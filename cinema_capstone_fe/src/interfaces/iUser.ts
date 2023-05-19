export interface IUser {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  cinemaPoints: number;
  tickets: [];
}

export interface UserDto {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  birthdate: Date;
  password: string;
}
