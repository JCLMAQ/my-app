import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as AppStoreActions from './app-store.actions';
import { AppStoreEffects } from './app-store.effects';

describe('AppStoreEffects', () => {
  let actions: Observable<Action>;
  let effects: AppStoreEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AppStoreEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(AppStoreEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: AppStoreActions.initAppStore() });

      const expected = hot('-a-|', {
        a: AppStoreActions.loadAppStoreSuccess({ appStore: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
