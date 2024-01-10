import { Route } from '@angular/router';
import { TodoStore } from './store/todo.state';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { TodoComponent } from './todo/todo.component';


export const todoRoutes: Route[] = [
  { path: 'tododetail/:id/:mode', component: TodoDetailComponent },
  {
    path: '',
    component: TodoComponent,
    providers: [
      TodoStore
    ],
  },
];
