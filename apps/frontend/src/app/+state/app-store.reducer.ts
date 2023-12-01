import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as AppStoreActions from './app-store.actions';
import { AppStoreEntity } from './app-store.models';

export const APP_STORE_FEATURE_KEY = 'appStore';

export interface AppStoreState extends EntityState<AppStoreEntity> {
  selectedId?: string | number; // which AppStore record has been selected
  loaded: boolean; // has the AppStore list been loaded
  error?: string | null; // last known error (if any)
}

export interface AppStorePartialState {
  readonly [APP_STORE_FEATURE_KEY]: AppStoreState;
}

export const appStoreAdapter: EntityAdapter<AppStoreEntity> =
  createEntityAdapter<AppStoreEntity>();

export const initialAppStoreState: AppStoreState =
  appStoreAdapter.getInitialState({
    // set initial required properties
    loaded: false,
  });

const reducer = createReducer(
  initialAppStoreState,
  on(AppStoreActions.initAppStore, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(AppStoreActions.loadAppStoreSuccess, (state, { appStore }) =>
    appStoreAdapter.setAll(appStore, { ...state, loaded: true }),
  ),
  on(AppStoreActions.loadAppStoreFailure, (state, { error }) => ({
    ...state,
    error,
  })),
);

export function appStoreReducer(
  state: AppStoreState | undefined,
  action: Action,
) {
  return reducer(state, action);
}
