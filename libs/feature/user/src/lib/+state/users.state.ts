import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import { usersAPIActions, usersPageActions } from "./users.actions";
import { IUser } from "./users.models";


export interface UserState {
  users: IUser[];
  isLoading: boolean;
  selectedUserId: string | null;
  loaded: boolean;
}

export const initialState: UserState = {
  users: [],
  isLoading: false,
  selectedUserId: null,
  loaded: false
};

const reducer = createReducer(
  initialState,
  on(usersPageActions.load, (state: any) => ({ ...state, isLoading: true })),
  on(usersPageActions.select, (state: any, { id }: any) => ({
    ...state,
    selectedId: id,
  })),
  on(usersAPIActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    isLoading: false,
  })),
  on(usersAPIActions.loadUsersFailure, (state) => ({
    ...state,
    isLoading: false,
  }))
);

export const userFeature = createFeature({
  name: 'usersFeature',
  reducer,
  extraSelectors: ({ selectSelectedUserId, selectUsers }) => ({
    selectSelectedUser: createSelector(
      selectSelectedUserId,
      selectUsers,
      (selectedUserId, users) => users.find((s) => s.id === selectedUserId)
    )
  })
})
