import { Route } from '@angular/router';
import { TaskComponent } from './task/task.component';
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as fromTasks from './+state/tasks.reducer';
import { TasksEffects } from './+state/tasks.effects';

export const taskRoutes: Route[] = [
  {
    path: '',
    component: TaskComponent,
    providers: [
      provideState(fromTasks.TASKS_FEATURE_KEY, fromTasks.tasksReducer),
      provideEffects(TasksEffects),
    ],
  },
];
