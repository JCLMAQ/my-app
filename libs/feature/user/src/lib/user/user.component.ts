import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '@prisma/client';
import { MATERIAL } from 'material';
import { usersPageActions } from '../+state/users.actions';
import { UserInterface } from '../+state/users.models';
import { usersFeature } from '../+state/users.state';
import { UserService } from '../services/user.service';


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

users: User[]= [];

 constructor (
  private userService: UserService
 ){
 };
  store = inject(Store);

  readonly users$ = this.store.select(usersFeature.selectAll);
  readonly isUserSelected$ = this.store.select(usersFeature.selectIsUserSelected);
  readonly selectedUser$ = this.store.select(usersFeature.selectSelectedUser);

  // users$ = this.store.select(usersFeature.selectUsers);
  // selectedUser$ = this.store.select( usersFeature.selectSelectedUserId );
  readonly isLoading$ = this.store.select(usersFeature.selectIsLoading);

  ngOnInit() {
    this.store.dispatch(usersPageActions.load());
    // const usersbis: User[] = this.userService.getAllUserItems();
    console.log(this.userService.getAllUserItems())
  }

  selectUser(user: UserInterface) {
    this.store.dispatch(usersPageActions.select(user));
  }

}
