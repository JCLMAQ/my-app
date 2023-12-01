import { Route } from '@angular/router';
import { PageNotFoundComponent } from '@my-app/ui/pages';

export const appRoutes: Route[] = [
  { path: 'task', 
    loadChildren: () => import('task').then((m) => m.taskRoutes), },
  {
    path: 'users',
    loadChildren: () => import('user').then((m) => m.userRoutes),
  },

  {
    path: 'page',
    loadChildren: () => import('@my-app/ui/pages').then((m) => m.uiPagesRoutes),
  },

  {
    path: 'auth',
    loadChildren: () => import('@my-app/ui/auth').then((m) => m.uiAuthRoutes),
  },
  { path: '', redirectTo: 'page', pathMatch: 'full' },

  { path: '**', component: PageNotFoundComponent },
];
