import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import { usersAPIActions, usersPageActions } from "./users.actions";
import { UserInterface } from "./users.models";


// export const USERS_FEATURE_KEY = 'users';


export interface UsersStateInterface {
  isLoading: boolean;
  error: string | null;
  loaded: boolean;
  users: UserInterface [];
  selectedUserId: string | undefined | null;
}

// export const usersAdapter: EntityAdapter<UserInterface> = createEntityAdapter<UserInterface>();

export const initialUsersState: UsersStateInterface = {
  users: [],
  isLoading: false,
  loaded: false,
  error: null,
  selectedUserId: null,
};

const reducer = createReducer(
  initialUsersState,
  on(usersPageActions.load,(state) => ({
    ...state,
    isLoading: true,
    loaded: false,
    error: null,
  }) ),
  on(usersPageActions.init, (state) => ({
    ...state,
    isLoading: false,
    loaded: false,
    error: null,
  })),

  on(usersPageActions.select, (state, action) => ({
    ...state,
    selectedUserId: action.id,
  })),

  on(usersAPIActions.loadUsersSuccess,(state , action) => ({
    ...state,
    isLoading: false,
    loaded: true,
    users: action.users,
  }) ),
  on(usersAPIActions.loadUsersFailure,(state, action) => ({
    ...state,
    isLoading: false,
    loaded: false,
    error: action.error,
  }) ),
)

// Create Feature
export const usersFeature = createFeature({
  name: 'usersFeature',
  reducer: reducer,
  extraSelectors: ({ selectSelectedUserId,selectUsers}) => ({
    selectSelectedUser: createSelector(
      selectSelectedUserId,
      selectUsers,
      (selectedUserId, users) => users.find((s) => s.id === selectedUserId),
    )
  })
  })
