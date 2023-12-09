import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { UserInterface } from './users.models';


export const initUsers = createAction('[Users Pagebis] Init');
export const usersAPIActions = createActionGroup({
  source: 'Users API',
  events: {
    'Load Users': emptyProps(),
    'Load Users Success': props<{ users: UserInterface[]}>(),
    'Load Users Failure': props<{ error: string }>(),
  },
});

export const usersPageActions = createActionGroup({
  source: 'Users Page',
  events: {
    'Init':emptyProps(),
    load: emptyProps(),
    select: props<UserInterface>(),
    addUser: props<{ user: UserInterface }>(),
    selectUser: props<{ userId: string }>(),
  },
});
