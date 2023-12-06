import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { MATERIAL } from 'material';
import { usersPageActions } from '../+state/users.actions';
import { IUser } from '../+state/users.models';
import { usersFeature } from '../+state/users.state';

@Component({
  selector: 'lib-user',
  standalone: true,
  imports: [
    CommonModule,
    ...MATERIAL,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {

  store = inject(Store);

  readonly users$ = this.store.select(usersFeature.selectAll);
  readonly isUserSelected$ = this.store.select(usersFeature.selectIsUserSelected);
  readonly selectedUser$ = this.store.select(usersFeature.selectSelectedUser);

  // users$ = this.store.select(usersFeature.selectUsers);
  // selectedUser$ = this.store.select( usersFeature.selectSelectedUserId );
  isLoading$ = this.store.select(usersFeature.selectIsLoading);

  ngOnInit() {
    this.store.dispatch(usersPageActions.load());
  }

  selectUser(user: IUser) {
    this.store.dispatch(usersPageActions.select(user));
  }

}
