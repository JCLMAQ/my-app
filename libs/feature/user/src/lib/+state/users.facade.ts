import { Injectable, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as UsersActions from './users.actions';
// import * as UsersFeature from './users.state';
import { Dictionary } from '@ngrx/entity';
import { Observable } from 'rxjs';
import { IUser } from './users.models';
import * as UsersSelectors from './users.state';

@Injectable()
export class UsersFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(UsersSelectors.selectLoaded));// TodosSelectors.selectTodosLoaded));
  allUsers$ = this.store.pipe(select( UsersSelectors.selectEntities)); //TodosSelectors.selectAllTodos));
  selectedUsers$ = this.store.pipe(select(UsersSelectors.selectSelectedUserId));// TodosSelectors.selectEntity));

  users$: Observable<Dictionary<IUser>> = this.store.select(UsersSelectors.selectEntities);// selectAllUsers);

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(UsersActions.initUsers());
  }

  loadUsers() {
    this.store.dispatch(UsersActions.usersPageActions.load());
  }
}
