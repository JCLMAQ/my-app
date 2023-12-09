import { Task } from "@prisma/client";

export interface TaskInterface extends Partial<Task> {}

export interface TasksStateInterface {
  isLoading: boolean;
  error: string | null;
  loaded: boolean;
  tasks: TaskInterface []
}
