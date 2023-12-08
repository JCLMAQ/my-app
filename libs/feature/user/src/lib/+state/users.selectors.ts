import { createSelector } from '@ngrx/store';
import { AppStateInterface } from 'apps/frontend/src/app/appState.interface';


export const selectFeature = (state: AppStateInterface ) => state.users;

export const isLoadingSelector = createSelector(
  selectFeature,
  (state) => state.isLoading
  )

export const usersSelector = createSelector(
  selectFeature,
  (state) => state.users
);

export const errorSelector = createSelector(
  selectFeature,
  (state) => state.error
);

// Lookup the 'Tasks' feature state managed by NgRx
// export const selectTasksState =
//   createFeatureSelector<TasksState>(TASKS_FEATURE_KEY);

// const { selectAll, selectEntities } = tasksAdapter.getSelectors();

// export const selectTasksLoaded = createSelector(
//   selectTasksState,
//   (state: TasksState) => state.loaded,
// );

// export const selectTasksError = createSelector(
//   selectTasksState,
//   (state: TasksState) => state.error,
// );

// export const selectAllTasks = createSelector(
//   selectTasksState,
//   (state: TasksState) => selectAll(state),
// );

// export const selectTasksEntities = createSelector(
//   selectTasksState,
//   (state: TasksState) => selectEntities(state),
// );

// export const selectSelectedId = createSelector(
//   selectTasksState,
//   (state: TasksState) => state.selectedId,
// );

// export const selectEntity = createSelector(
//   selectTasksEntities,
//   selectSelectedId,
//   (entities, selectedId) => (selectedId ? entities[selectedId] : undefined),
// );
