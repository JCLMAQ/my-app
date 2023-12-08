import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from 'apps/frontend/src/app/appState.interface';
import { MATERIAL } from 'material';
import { Observable } from 'rxjs';
import { errorSelector, isLoadingSelector } from 'user';
import { usersAPIActions } from '../+state/users.actions';
import { UserInterface } from '../+state/users.models';
import { usersSelector } from '../+state/users.selectors';


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

  constructor( private store: Store<AppStateInterface>) {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.users$ = this.store.pipe(select(usersSelector));
  }

  ngOnInit() {
    this.store.dispatch(usersAPIActions.loadUsers())
  }

  // selectUser(user: UserInterface) {
  //   this.store.dispatch(usersPageActions.select(user));
  // }

}
