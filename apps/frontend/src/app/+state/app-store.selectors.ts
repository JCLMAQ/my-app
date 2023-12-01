import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  APP_STORE_FEATURE_KEY,
  AppStoreState,
  appStoreAdapter,
} from './app-store.reducer';

// Lookup the 'AppStore' feature state managed by NgRx
export const selectAppStoreState = createFeatureSelector<AppStoreState>(
  APP_STORE_FEATURE_KEY,
);

const { selectAll, selectEntities } = appStoreAdapter.getSelectors();

export const selectAppStoreLoaded = createSelector(
  selectAppStoreState,
  (state: AppStoreState) => state.loaded,
);

export const selectAppStoreError = createSelector(
  selectAppStoreState,
  (state: AppStoreState) => state.error,
);

export const selectAllAppStore = createSelector(
  selectAppStoreState,
  (state: AppStoreState) => selectAll(state),
);

export const selectAppStoreEntities = createSelector(
  selectAppStoreState,
  (state: AppStoreState) => selectEntities(state),
);

export const selectSelectedId = createSelector(
  selectAppStoreState,
  (state: AppStoreState) => state.selectedId,
);

export const selectEntity = createSelector(
  selectAppStoreEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined),
);
