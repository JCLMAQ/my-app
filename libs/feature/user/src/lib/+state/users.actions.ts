import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { IUser } from './users.models';

export const initUsers = createAction('[Users Page] Init');



export const usersAPIActions = createActionGroup({
  source: 'Users API',
  events: {
    'Load Users Success': props<{ users: IUser[] }>(),
    'Load Users Failure': props<{ error: string }>(),
  },
});

export const usersPageActions = createActionGroup({
  source: 'Users Page',
  events: {
    load: emptyProps(),
    select: props<IUser>(),
  },
});
