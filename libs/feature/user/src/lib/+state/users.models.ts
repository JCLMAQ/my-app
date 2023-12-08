
import { User } from "@prisma/client";

export interface UserInterface extends Partial<User>{}

export interface UsersStateInterface {
  isLoading: boolean;
  error: string | null;
  loaded: boolean;
  users: UserInterface []
}


export type ICreateUser =Partial<Omit<UserInterface, 'id'>>;
// export type ICreateUser = Pick<IUser, 'firstName' | 'lastName'>;
export type IUpdateUser = Partial<Omit<UserInterface, 'id'>>;
export type IUpsertUser = Partial<Omit<UserInterface, 'id'>>;

export class CreateUserDto implements ICreateUser {}

export class UpsertUserDto implements IUpsertUser {}

export class UpdateUserDto implements IUpdateUser {}
