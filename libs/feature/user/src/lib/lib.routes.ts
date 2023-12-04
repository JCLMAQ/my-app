import { Route } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { UsersFacade } from './+state/users.facade';
import { UsersEffects } from './+state/usersbase.effects';
import * as fromUsers from './+state/usersbase.reducer';
import { UserComponent } from './user/user.component';

export const userRoutes: Route[] = [
  {
    path: '',
    component: UserComponent,
    providers: [
      UsersFacade,
      provideState(fromUsers.USERS_FEATURE_KEY, fromUsers.usersReducer),
      provideEffects(UsersEffects),
    ],
  },
];
