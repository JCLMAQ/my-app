import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as AppStoreActions from './app-store.actions';
import * as AppStoreFeature from './app-store.reducer';

@Injectable()
export class AppStoreEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppStoreActions.initAppStore),
      switchMap(() =>
        of(AppStoreActions.loadAppStoreSuccess({ appStore: [] })),
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(AppStoreActions.loadAppStoreFailure({ error }));
      }),
    ),
  );
}
