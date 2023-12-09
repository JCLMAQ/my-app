import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from 'apps/frontend/src/app/appState.interface';
import { MATERIAL } from 'material';
import { Observable, delay } from 'rxjs';
import * as UsersActions from '../+state/users.actions';
import { UserInterface } from '../+state/users.models';
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
  isLoading$: Observable<boolean>;
  error$: Observable<string | null> | undefined;
  users$: Observable<UserInterface[]> | undefined;
  selectedUser$: Observable<UserInterface | null | undefined> | undefined;

  constructor( private store: Store<AppStateInterface>) {
    this.isLoading$ = this.store.pipe(delay(1500), select(usersFeature.selectIsLoading) );
    this.error$ = this.store.pipe(select(usersFeature.selectError));
    this.users$ = this.store.pipe(select(usersFeature.selectUsers));
    this.selectedUser$ = this.store.pipe(select(usersFeature.selectSelectedUser))
  }

  ngOnInit() {
    this.store.dispatch(UsersActions.usersPageActions.load());
  }

}
