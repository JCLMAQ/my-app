import { Route } from '@angular/router';
import { PageNotFoundComponent } from '@fe/pages';

export const appRoutes: Route[] = [
  {
    path: 'todo',
    loadChildren: () => import('@fe/todo').then((m) => m.todoRoutes),
  },
  {
    path: 'tasks',
    loadChildren: () => import('@fe/task').then((m) => m.taskRoutes),
  },
  {
    path: 'todos',
    loadChildren: () => import('@fe/todo').then((m) => m.todoRoutes),
  },
  {
    path: 'users',
    loadChildren: () => import('@fe/user').then((m) => m.userRoutes),
  },

  {
    path: 'page',
    loadChildren: () => import('@fe/pages').then((m) => m.uiPagesRoutes),
  },

  {
    path: 'auth',
    loadChildren: () => import('@fe/auth').then((m) => m.uiAuthRoutes),
  },
  { path: '', redirectTo: 'page', pathMatch: 'full' },

  { path: '**', component: PageNotFoundComponent },
];
