import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as TasksActions from './tasks.actions';
import { ITask } from './tasks.models';

export const TASKS_FEATURE_KEY = 'tasks';

export interface TasksState extends EntityState<ITask> {
  selectedId?: string | number; // which Tasks record has been selected
  loaded: boolean; // has the Tasks list been loaded
  error?: string | null; // last known error (if any)
}

export interface TasksPartialState {
  readonly [TASKS_FEATURE_KEY]: TasksState;
}

export const tasksAdapter: EntityAdapter<ITask> =
  createEntityAdapter<ITask>();

export const initialTasksState: TasksState = tasksAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const reducer = createReducer(
  initialTasksState,
  on(TasksActions.tasksPageActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(TasksActions.tasksAPIActions.loadTasksSuccess, (state, { tasks }) =>
    tasksAdapter.setAll(tasks, { ...state, loaded: true }),
  ),
  on(TasksActions.tasksAPIActions.loadTasksFailure, (state, { error }) => ({
    ...state,
    error,
  })),
);

export function tasksReducer(state: TasksState | undefined, action: Action) {
  return reducer(state, action);
}
