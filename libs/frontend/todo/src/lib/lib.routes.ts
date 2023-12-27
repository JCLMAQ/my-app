import { Route } from '@angular/router';
import { TodoStore } from './store/todo.state';
import { TodoComponent } from './todo/todo.component';


export const todoRoutes: Route[] = [
  {
    path: '',
    component: TodoComponent,
    providers: [
      TodoStore
    ],
  },
];
