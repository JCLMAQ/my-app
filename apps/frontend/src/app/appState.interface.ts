import { TasksStateInterface } from "task";
import { UsersStateInterface } from "user";


export interface AppStateInterface {
  users: UsersStateInterface;
  tasks: TasksStateInterface;
}
