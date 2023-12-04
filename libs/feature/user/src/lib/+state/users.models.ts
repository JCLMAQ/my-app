import { User } from "@prisma/client";

/**
 * Interface for the 'Users' data
 */
export interface UsersEntity {
  id: string | number; // Primary ID
  name: string;
}

export interface IUser extends Partial<User>{
  // id: string | number; // Primary ID
  // name: string;
}

export type ICreateUser = Pick<IUser, 'firstName' | 'lastName'>;
export type IUpdateUser = Partial<Omit<IUser, 'id'>>;
export type IUpsertUser = IUser;

export class CreateUserDto implements ICreateUser {
  //
}

export class UpsertUserDto implements IUpsertUser {
  //
}

export class UpdateUserDto implements IUpdateUser {
  //
}
