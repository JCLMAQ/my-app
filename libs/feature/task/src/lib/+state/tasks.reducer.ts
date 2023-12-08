import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as TasksActions from './tasks.actions';
import { TaskInterface, TasksStateInterface } from './tasks.models';

export const TASKS_FEATURE_KEY = 'tasks';

export interface TasksState extends EntityState<TaskInterface> {
  selectedTaskId?: string | number; // which Tasks record has been selected
  loaded: boolean; // has the Tasks list been loaded
  error?: string | null; // last known error (if any)
}

export interface TasksPartialState {
  readonly [TASKS_FEATURE_KEY]: TasksState;
}

export const tasksAdapter: EntityAdapter<TaskInterface> = createEntityAdapter<TaskInterface>();

export const initialTasksState: TasksStateInterface = {
  // set initial required properties
  isLoading: false,
  tasks: [],
  error: null,
  loaded: false,
};

export const reducers = createReducer(
  initialTasksState,
  on(TasksActions.getTasks,(state) => ({ ...state, isLoading: true }) ),
  on(TasksActions.getTasksSuccess,(state , action) => ({
    ...state,
    isLoading: false,
    tasks: action.tasks,

  }) ),
  on(TasksActions.getTasksFailure,(state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  }) ),


  on(TasksActions.initTasks, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  // on(TasksActions.loadTasksSuccess, (state, { tasks }) =>
  //   tasksAdapter.setAll(tasks, { ...state, loaded: true }),
  // ),
//   on(TasksActions.loadTasksFailure, (state, { error }) => ({
//     ...state,
//     error,
//   })),
);

export function tasksReducer(state: TasksStateInterface, action: Action) {
  return reducers(state, action);
}
