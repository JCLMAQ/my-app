import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { tasksAPIActions, tasksPageActions } from "./tasks.actions";
import { TaskInterface } from './tasks.models';

// export const TASKS_FEATURE_KEY = 'tasks';

export interface TasksStateInterface {
  isLoading: boolean;
  loaded: boolean; // has the Tasks list been loaded
  error: string | null; // last known error (if any)
  tasks: TaskInterface[];
  selectedTaskId: string | null | undefined; // which Tasks record has been selected
}

// export const tasksAdapter: EntityAdapter<TaskInterface> = createEntityAdapter<TaskInterface>();

export const initialTasksState: TasksStateInterface = {
  // set initial required properties
  isLoading: false,
  error: null,
  loaded: false,
  selectedTaskId: null,
  tasks: [],
};

const reducer = createReducer(
  initialTasksState,
  on(tasksPageActions.load,(state) => ({
    ...state,
    isLoading: true,
    loaded: false,
    error: null,
  }) ),
  on(tasksPageActions.init, (state) => ({
    ...state,
    isLoading: false,
    loaded: false,
    error: null,
  })),

  on(tasksPageActions.select, (state, action) => ({
    ...state,
    selectedTaskId: action.id,
  })),

  on(tasksAPIActions.loadTasksSuccess,(state , action) => ({
    ...state,
    isLoading: false,
    loaded: true,
    tasks: action.tasks,
  }) ),
  on(tasksAPIActions.loadTasksFailure,(state, action) => ({
    ...state,
    isLoading: false,
    loaded: false,
    error: action.error,
  }) ),
);

// Create Feature
export const tasksFeature = createFeature({
  name: 'tasksFeature',
  reducer: reducer,
  extraSelectors: ({ selectSelectedTaskId,selectTasks}) => ({
    selectSelectedTask: createSelector(
      selectSelectedTaskId,
      selectTasks,
      (selectedTaskId, tasks) => tasks.find((s) => s.id === selectedTaskId),
    )
  })
  })

