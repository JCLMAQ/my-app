import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { TasksService } from '../services/tasks.service';
import * as TasksActions from './tasks.actions';

@Injectable()
// export class TasksEffects {
//   private actions$ = inject(Actions);
//   private tasksService = inject(TasksService);



export class TasksEffects {

  // constructor(private actions$: Actions, private tasksService: TasksService) {}
  private actions$ = inject(Actions);
  private tasksService = inject(TasksService);

  getTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.getTasks),
      mergeMap( () => {
        return this.tasksService.getTasks().pipe(
          map( (tasks) => TasksActions.getTasksSuccess({tasks})),
          catchError((error) =>
          of(TasksActions.getTasksFailure({error: error.message}))
          )
        );
      }
    )
    )
  )

  init$ = createEffect(() =>
      this.actions$.pipe(
        ofType(TasksActions.initTasks),
        switchMap(() => of(TasksActions.getTasksSuccess({ tasks: [] }))),

      ),
    );



}
