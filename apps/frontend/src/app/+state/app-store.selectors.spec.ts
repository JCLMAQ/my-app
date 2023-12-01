import { AppStoreEntity } from './app-store.models';
import {
  appStoreAdapter,
  AppStorePartialState,
  initialAppStoreState,
} from './app-store.reducer';
import * as AppStoreSelectors from './app-store.selectors';

describe('AppStore Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getAppStoreId = (it: AppStoreEntity) => it.id;
  const createAppStoreEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    }) as AppStoreEntity;

  let state: AppStorePartialState;

  beforeEach(() => {
    state = {
      appStore: appStoreAdapter.setAll(
        [
          createAppStoreEntity('PRODUCT-AAA'),
          createAppStoreEntity('PRODUCT-BBB'),
          createAppStoreEntity('PRODUCT-CCC'),
        ],
        {
          ...initialAppStoreState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        },
      ),
    };
  });

  describe('AppStore Selectors', () => {
    it('selectAllAppStore() should return the list of AppStore', () => {
      const results = AppStoreSelectors.selectAllAppStore(state);
      const selId = getAppStoreId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = AppStoreSelectors.selectEntity(state) as AppStoreEntity;
      const selId = getAppStoreId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectAppStoreLoaded() should return the current "loaded" status', () => {
      const result = AppStoreSelectors.selectAppStoreLoaded(state);

      expect(result).toBe(true);
    });

    it('selectAppStoreError() should return the current "error" state', () => {
      const result = AppStoreSelectors.selectAppStoreError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
