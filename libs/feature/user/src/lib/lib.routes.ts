import { Route } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import * as fromUsers from 'user';
import { UserComponent } from './user/user.component';

export const userRoutes: Route[] = [
  {
    path: '',
    component: UserComponent,
    providers: [
      provideState(fromUsers.usersFeature),
      provideEffects(fromUsers.UsersEffects),
    ],
  },
];
