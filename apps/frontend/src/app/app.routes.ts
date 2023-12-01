import { Route } from '@angular/router';
import { PageNotFoundComponent } from '@my-app/ui/pages';

export const appRoutes: Route[] = [

  {
    path: 'page',
    loadChildren: () =>
      import('@my-app/ui/pages').then((m) => m.uiPagesRoutes),
  },

  {
    path: 'auth',
    loadChildren: () => import('@my-app/ui/auth').then((m) => m.uiAuthRoutes),
  },
  { path: '', redirectTo: 'page', pathMatch: 'full' },

  { path: '**', component: PageNotFoundComponent },
];
