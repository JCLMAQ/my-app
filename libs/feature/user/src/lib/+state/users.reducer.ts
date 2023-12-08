import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { Action, createReducer, on } from "@ngrx/store";
import { usersAPIActions, usersPageActions } from "./users.actions";
import { UserInterface, UsersStateInterface } from "./users.models";


export const USERS_FEATURE_KEY = 'users';
export interface UsersState extends EntityState <UserInterface>{
  // users: UserInterface[];
  isLoading: boolean;
  selectedUserId: string | null;
  loaded: boolean;
  error: string | null;
}

export interface UsersPartialState {
  readonly [USERS_FEATURE_KEY]: UsersStateInterface;
}

export const usersAdapter: EntityAdapter<UserInterface> = createEntityAdapter<UserInterface>();

export const initialUsersState: UsersStateInterface = {
  isLoading: false,
  users: [],
  error: null,
  loaded: false,
};



/// Reducer
// const reducer = createReducer(
//   initialUsersState,
//   on(usersPageActions.load, (state: any, actions) => ({
//     ...state,
//     isLoading: true,
//     // users: actions.type,
//   })),
//   on(usersPageActions.select, (state: any, { id }: any) => ({
//     ...state,
//     selectedId: id,
//   })),
//   on(usersPageActions.addUser, (state, { user }) =>
//     adapter.addOne(user, state)
//   ),
//   on(usersPageActions.selectUser, (state, { userId }) => ({
//     ...state,
//     selectedUserId: userId,
//   })),
//   on(usersAPIActions.loadUsersSuccess, (state, { users }) => ({
//     ...state,
//     users,
//     isLoading: false,
//     loaded: true,
//   })),
//   on(usersAPIActions.loadUsersFailure, (state) => ({
//     ...state,
//     isLoading: false,
//     loaded: false,
//   })),

// )


export const reducers = createReducer(
  initialUsersState,
  on(usersAPIActions.loadUsers,(state) => ({ ...state, isLoading: true }) ),
  on(usersAPIActions.loadUsersSuccess,(state , action) => ({
    ...state,
    isLoading: false,
    tasks: action.users,

  }) ),
  on(usersAPIActions.loadUsersFailure,(state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
   }) ),


  on(usersPageActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
)

export function tasksReducer(state: UsersStateInterface, action: Action) {
  return reducers(state, action);
}

// Create Feature
// export const usersFeature = createFeature( {
//   name: 'usersFeature',
//   reducer,
//   extraSelectors: ()
// }

// )



// export const usersFeature = createFeature({
//   name: 'users',
//   reducer,
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
