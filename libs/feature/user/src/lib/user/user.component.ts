import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { MATERIAL } from 'material';
import { usersPageActions } from '../+state/users.actions';
import { IUser } from '../+state/users.models';
import { userFeature } from '../+state/users.state';

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

  users$ = this.store.select(userFeature.selectUsers);
  selectedUser$ = this.store.select( userFeature.selectSelectedUser );
  isLoading$ = this.store.select(userFeature.selectIsLoading);

  ngOnInit() {
    this.store.dispatch(usersPageActions.load());
  }

  selectUser(user: IUser) {
    this.store.dispatch(usersPageActions.select(user));
  }

}
