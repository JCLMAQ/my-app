import { TasksStateInterface } from "task";
import { UserStateInterface } from "user";


export interface AppStateInterface {
  users: UserStateInterface;
  tasks: TasksStateInterface;
}
