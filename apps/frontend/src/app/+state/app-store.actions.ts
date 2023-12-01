import { createAction, props } from '@ngrx/store';
import { AppStoreEntity } from './app-store.models';

export const initAppStore = createAction('[AppStore Page] Init');

export const loadAppStoreSuccess = createAction(
  '[AppStore/API] Load AppStore Success',
  props<{ appStore: AppStoreEntity[] }>(),
);

export const loadAppStoreFailure = createAction(
  '[AppStore/API] Load AppStore Failure',
  props<{ error: any }>(),
);
