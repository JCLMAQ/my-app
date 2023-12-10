import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { MATERIAL } from 'material';
import { delay } from 'rxjs';
import * as UsersActions from '../+state/users.actions';
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
export class UserComponent implements OnInit {

  private readonly store = inject(Store);

  readonly users$ = this.store.select(usersFeature.selectAll);
  readonly isUserSelected$ = this.store.select(usersFeature.selectIsUserSelected);
  readonly selectedUser$ = this.store.select(usersFeature.selectSelectedUser);
  readonly loaded$ = this.store.select(usersFeature.selectLoaded)
  readonly isLoading$ = this.store.pipe(delay(1500), select(usersFeature.selectIsLoading) );
  readonly error$ = this.store.pipe(select(usersFeature.selectError));

  ngOnInit() {
    this.store.dispatch(UsersActions.usersPageActions.load());
  }

}
