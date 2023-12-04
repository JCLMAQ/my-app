import { EntityState } from "@ngrx/entity";
import { Task } from "@prisma/client";

/**
 * Interface for the 'Tasks' data
 */
export interface TasksEntity extends Partial<Task> {

}

export interface TasksStateInterface extends EntityState<TasksEntity> {
 isLoading: boolean;
 error: string;
}
