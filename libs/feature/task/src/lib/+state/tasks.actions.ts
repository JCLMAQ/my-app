import { createAction, props } from '@ngrx/store';
import { TaskInterface } from './tasks.models';

export const initTasks = createAction('[Tasks Page] Init');
export const getTasks = createAction('[Tasks] Get Tasks');
export const getTasksSuccess = createAction(
  '[Tasks] Get Tasks Success',
  props<{ tasks: TaskInterface[]}>(),
  );
export const getTasksFailure = createAction(
  '[Tasks] Get Tasks Failure',
  props<{ error: string }>()
  );


// export const loadTasksSuccess = createAction(
//   '[Tasks/API] Load Tasks Success',
//   props<{ tasks: TaskInterface[] }>(),
// );

// export const loadTasksFailure = createAction(
//   '[Tasks/API] Load Tasks Failure',
//   props<{ error: any }>(),
// );
