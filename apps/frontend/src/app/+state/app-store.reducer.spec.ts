import { Action } from '@ngrx/store';

import * as AppStoreActions from './app-store.actions';
import { AppStoreEntity } from './app-store.models';
import {
  AppStoreState,
  initialAppStoreState,
  appStoreReducer,
} from './app-store.reducer';

describe('AppStore Reducer', () => {
  const createAppStoreEntity = (id: string, name = ''): AppStoreEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid AppStore actions', () => {
    it('loadAppStoreSuccess should return the list of known AppStore', () => {
      const appStore = [
        createAppStoreEntity('PRODUCT-AAA'),
        createAppStoreEntity('PRODUCT-zzz'),
      ];
      const action = AppStoreActions.loadAppStoreSuccess({ appStore });

      const result: AppStoreState = appStoreReducer(
        initialAppStoreState,
        action,
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = appStoreReducer(initialAppStoreState, action);

      expect(result).toBe(initialAppStoreState);
    });
  });
});
