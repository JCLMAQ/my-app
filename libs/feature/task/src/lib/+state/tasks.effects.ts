import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, switchMap } from 'rxjs';
import * as TasksActions from './tasks.actions';

@Injectable()
export class TasksEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.tasksPageActions.init),
      switchMap(() => of(TasksActions.tasksAPIActions.loadTasksSuccess({ tasks: [] }))),
      catchError((error) => {
        console.error('Error', error);
        return of(TasksActions.tasksAPIActions.loadTasksFailure({ error }));
      }),
    ),
  );
}
