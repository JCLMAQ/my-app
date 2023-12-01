import { importProvidersFrom } from '@angular/core';
import { Route } from '@angular/router';
import { EntityDefinitionService } from '@ngrx/data';
import { UserDataService } from './store/user-data.service';
import { UserEntityService } from './store/user-entity.service';
import { UserResolver } from './store/user.resolver';
import { UsersDetailsComponent } from './users-details/users-details.component';
import { UsersListComponent } from './users-list/users-list.component';

export const uiUserRoutes: Route[] = [
  { path: '',
    providers: [
      importProvidersFrom( UserEntityService),
      UserResolver,
      importProvidersFrom( UserDataService),
      importProvidersFrom(EntityDefinitionService),
    ],
    children: [
      { path: '',
        component: UsersListComponent,
        resolve:{users: UserResolver}},
      { path: 'usersdetail/:id/:mode',
        component: UsersDetailsComponent},
      { path: 'userslist',
        component: UsersListComponent,
        resolve:{users: UserResolver}},
    ]
  },
];
