import { EntityState } from "@ngrx/entity";
import { Task } from "@prisma/client";

/**
 * Interface for the 'Tasks' data
 */
export interface ITask extends Partial<Task> {

}

export interface TasksStateInterface extends EntityState<ITask> {
 isLoading: boolean;
 error: string;
}
