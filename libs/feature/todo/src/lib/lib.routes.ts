import { Route } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as fromTodos from './+state/todos.reducer';
import { TodosEffects } from './+state/todos.effects';
import { TodosFacade } from './+state/todos.facade';

export const todoRoutes: Route[] = [
  {
    path: '',
    component: TodoComponent,
    providers: [
      TodosFacade,
      provideState(fromTodos.TODOS_FEATURE_KEY, fromTodos.todosReducer),
      provideEffects(TodosEffects),
    ],
  },
];
