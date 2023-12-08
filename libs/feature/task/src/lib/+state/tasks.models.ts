import { Task } from "@prisma/client";

/**
 * Interface for the 'Tasks' data
//  */
// export interface TaskInterface extends Task {};
export interface TaskInterface extends Partial<Task> {}

// export interface TaskInterface {
//   id: string;
//   title: string;
// }


export interface TasksStateInterface {
  isLoading: boolean;
  error: string | null;
  loaded: boolean;
  tasks: TaskInterface []
}
