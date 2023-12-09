import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import { usersAPIActions, usersPageActions } from "./users.actions";
import { UserInterface } from "./users.models";


// export const USERS_FEATURE_KEY = 'users';


export interface UsersStateInterface {
  isLoading: boolean;
  error: string | null;
  loaded: boolean;
  users: UserInterface [];
  selectedUserId: string | null;
}

// export interface UsersPartialState {
//   readonly [USERS_FEATURE_KEY]: UsersState;
// }

// export const usersAdapter: EntityAdapter<UserInterface> = createEntityAdapter<UserInterface>();

export const initialUsersState: UsersStateInterface = {
  users: [],
  isLoading: false,
  loaded: false,
  error: null,
  selectedUserId: null,
};


export const reducer = createReducer(
  initialUsersState,
  on(usersPageActions.load,(state) => ({ ...state, isLoading: true }) ),
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


  on(usersPageActions.init, (state) => ({
    ...state,
    isLoading: false,
    loaded: false,
    error: null,
  })),
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



// export const usersFeature = createFeature({
//   name: 'users',
//   reducers,

  // extraSelectors: ({ selectSelectedUserId, selectUsersState, selectEntities }) => ({
  //   selectSelectedUserBis: createSelector(
  //     selectSelectedUserId,
  //     // selectUsers,
  //     (selectedUserId: any, users: any[]) => users.find((s) => s.id === selectedUserId),
  //   ),
  //     ...adapter.getSelectors(selectUsersState),
  //   selectIsUserSelected: createSelector(
  //     selectSelectedUserId,
  //     (selectedId) => selectedId !== null
  //   ),
  //   selectSelectedUser: createSelector(
  //     selectSelectedUserId,
  //     selectEntities,
  //     (selectedId, entities) => selectedId ? entities[selectedId] : null
  //   ),
  // })
// })

// export const {
//   name: usersFeatureKey,
//   reducer: usersReducer,
//   selectError,
//   selectEntities,
//   selectIsLoading,
//   selectLoaded,
//   selectSelectedUserId
// } = usersFeature;
