
/**
 * Interface for the 'Users' data
 */
// export interface UsersEntity {
//   id: string | number; // Primary ID
//   name: string;
// }

import { User } from "@prisma/client";

// export interface IUser extends User{
  export interface IUser extends Partial<User>{
}

export type ICreateUser =Partial<Omit<IUser, 'id'>>;
// export type ICreateUser = Pick<IUser, 'firstName' | 'lastName'>;
export type IUpdateUser = Partial<Omit<IUser, 'id'>>;
export type IUpsertUser = Partial<Omit<IUser, 'id'>>;

export class CreateUserDto implements ICreateUser {
  //
}

export class UpsertUserDto implements IUpsertUser {
  //
}

export class UpdateUserDto implements IUpdateUser {
  //
}
