import { Route } from '@angular/router';
// import * as fromUsers from 'user';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import * as fromUsers from 'user';
import { UserComponent } from './user/user.component';

export const userRoutes: Route[] = [
  {
    path: '',
    component: UserComponent,
    // providers: [
    //   provideState(fromUsers.userFeature),
    //   provideEffects(usersEffects),
    // ],
    providers: [
      provideEffects(fromUsers.usersEffects),
      provideState(fromUsers.userFeature),
    ]
  },
];
