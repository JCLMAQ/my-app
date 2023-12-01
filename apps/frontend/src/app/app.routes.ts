import { Route } from '@angular/router';
import { PageNotFoundComponent } from 'pages';

export const appRoutes: Route[] = [
  { path: 'tasks',
    loadChildren: () => import('task').then((m) => m.taskRoutes), },
  {
    path: 'users',
    loadChildren: () => import('user').then((m) => m.userRoutes),
  },

  {
    path: 'page',
    loadChildren: () => import('pages').then((m) => m.uiPagesRoutes),
  },

  {
    path: 'auth',
    loadChildren: () => import('auth').then((m) => m.uiAuthRoutes),
  },
  { path: '', redirectTo: 'page', pathMatch: 'full' },

  { path: '**', component: PageNotFoundComponent },
];
